import 'dotenv/config'
import express from 'express'
import rateLimit from 'express-rate-limit'
import twilio from 'twilio'
import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { validateReservation } from './validation.js'

const app = express()
const port = Number(process.env.PORT || 3001)
const businessTimeZone = process.env.BUSINESS_TIME_ZONE || 'Asia/Kolkata'
new Intl.DateTimeFormat('en', { timeZone: businessTimeZone })
const pendingReservations = new Map()
const phoneRequestHistory = new Map()
const verificationLifetimeMs = 10 * 60 * 1000
const phoneRequestWindowMs = 60 * 60 * 1000

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 60,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
})

const verificationLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 25,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  message: { error: 'Too many code requests. Please try again in an hour.' },
})

const phonePattern = /^\+[1-9]\d{7,14}$/

const codePattern = /^\d{4,10}$/

const fromPattern = /^whatsapp:\+[1-9]\d{7,14}$/

const distDirectory = resolve(fileURLToPath(new URL('../dist/', import.meta.url)))

app.disable('x-powered-by')

const allowedOrigin = 'https://sanketkatrajkar.github.io'
app.use((request, response, next) => {
  if (request.get('Origin') === allowedOrigin) {
    response.setHeader('Access-Control-Allow-Origin', allowedOrigin)
    response.vary('Origin')
  }

  if (request.method === 'OPTIONS') {
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type')
    response.sendStatus(204)
    return
  }

  next()
})

app.use(express.json({ limit: '10kb' }))
app.use('/api/', apiLimiter)

function getWhatsAppConfiguration() {
  const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_VERIFY_SERVICE_SID } = process.env
  const ownerNumber = process.env.OWNER_WHATSAPP_NUMBER
  const from = process.env.TWILIO_WHATSAPP_FROM

  if (
    !TWILIO_ACCOUNT_SID ||
    !TWILIO_AUTH_TOKEN ||
    !TWILIO_VERIFY_SERVICE_SID ||
    !ownerNumber ||
    !from
  ) {
    return { error: 'WhatsApp booking is not configured yet. Please contact the cafe directly.' }
  }
  if (!phonePattern.test(ownerNumber) || !fromPattern.test(from)) {
    return { error: 'WhatsApp sender configuration is invalid. Please contact the cafe directly.' }
  }

  return {
    client: twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN),
    serviceSid: TWILIO_VERIFY_SERVICE_SID,
    ownerNumber: `whatsapp:${ownerNumber}`,
    from,
  }
}

function prunePhoneRequestHistory(now) {
  for (const [phone, timestamps] of phoneRequestHistory) {
    const recent = timestamps.filter((timestamp) => now - timestamp < phoneRequestWindowMs)
    if (recent.length === 0) phoneRequestHistory.delete(phone)
    else phoneRequestHistory.set(phone, recent)
  }
}

function prunePendingReservations(now) {
  for (const [phone, pending] of pendingReservations) {
    if (pending.expiresAt <= now) pendingReservations.delete(phone)
  }
}

function recordPhoneCodeRequest(phone, now) {
  prunePhoneRequestHistory(now)
  const timestamps = phoneRequestHistory.get(phone) || []
  if (timestamps.length >= 3) return false
  timestamps.push(now)
  phoneRequestHistory.set(phone, timestamps)
  return true
}

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok' })
})

app.get('/api/reservations/status', (_request, response) => {
  const configuration = getWhatsAppConfiguration()
  if (configuration.error) {
    response.json({ configured: false, message: configuration.error })
    return
  }
  response.json({ configured: true })
})

app.post('/api/reservations/send-code', verificationLimiter, async (request, response) => {
  const result = validateReservation(request.body, { timeZone: businessTimeZone })
  if (result.error) {
    response.status(400).json({ error: result.error })
    return
  }

  const configuration = getWhatsAppConfiguration()
  if (configuration.error) {
    response.status(503).json({ error: configuration.error })
    return
  }

  const now = Date.now()
  prunePendingReservations(now)
  if (!recordPhoneCodeRequest(result.value.phone, now)) {
    response.status(429).json({ error: 'Too many code requests for this number. Please try again later.' })
    return
  }

  try {
    await configuration.client.verify.v2
      .services(configuration.serviceSid)
      .verifications.create({
        to: result.value.phone,
        channel: 'whatsapp',
      })
    pendingReservations.set(result.value.phone, {
      reservation: result.value,
      expiresAt: now + verificationLifetimeMs,
      verificationApproved: false,
      ownerNotificationSent: false,
      customerConfirmationSent: false,
      confirmationInProgress: false,
    })
    response.json({ message: 'Verification code sent. Check your WhatsApp messages.' })
  } catch (error) {
    console.error('WhatsApp verification send failed:', error.code || error.name || 'Twilio error')
    response.status(502).json({
      error: 'We could not send a WhatsApp code. Check your number and try again, or contact the cafe.',
    })
  }
})

app.post('/api/reservations/confirm', async (request, response) => {
  const phone = typeof request.body?.phone === 'string' ? request.body.phone.trim() : ''
  const code = typeof request.body?.code === 'string' ? request.body.code.trim() : ''
  if (!phonePattern.test(phone) || !codePattern.test(code)) {
    response.status(400).json({ error: 'Enter the WhatsApp number and verification code.' })
    return
  }

  const pending = pendingReservations.get(phone)
  if (!pending || pending.expiresAt <= Date.now()) {
    pendingReservations.delete(phone)
    response.status(410).json({ error: 'Your booking request expired. Please start again to get a new code.' })
    return
  }

  const configuration = getWhatsAppConfiguration()
  if (configuration.error) {
    response.status(503).json({ error: configuration.error })
    return
  }

  if (pending.confirmationInProgress) {
    response.status(409).json({ error: 'Your reservation confirmation is already being processed. Please wait.' })
    return
  }

  pending.confirmationInProgress = true
  const { reservation } = pending
  try {
    if (!pending.verificationApproved) {
      try {
        const verification = await configuration.client.verify.v2
          .services(configuration.serviceSid)
          .verificationChecks.create({ to: phone, code })

        if (verification.status !== 'approved') {
          response.status(400).json({ error: 'That code is not valid. Check it and try again.' })
          return
        }
        pending.verificationApproved = true
      } catch (error) {
        if (error.status === 404 || error.code === 20404) {
          response.status(400).json({ error: 'That code is invalid or expired. Request a new code and try again.' })
          return
        }
        console.error('WhatsApp verification check failed:', error.code || error.name || 'Twilio error')
        response.status(502).json({
          error: 'We could not verify the code right now. Please try again or contact the cafe.',
        })
        return
      }
    }

    if (!pending.ownerNotificationSent) {
      const ownerMessage = [
        'Verified table reservation — The Coffee Chapter, Karvenagar',
        `Name: ${reservation.name}`,
        `WhatsApp: ${reservation.phone}`,
        `Date: ${reservation.date}`,
        `Time: ${reservation.time}`,
        `Guests: ${reservation.guests}`,
      ].join('\n')

      try {
        await configuration.client.messages.create({
          from: configuration.from,
          to: configuration.ownerNumber,
          body: ownerMessage,
        })
        pending.ownerNotificationSent = true
      } catch (error) {
        console.error('Owner WhatsApp notification failed:', error.code || error.name || 'Twilio error')
        response.status(502).json({
          error: 'Your number is verified, but the owner could not be notified. Submit the same code to retry.',
        })
        return
      }
    }

    if (!pending.customerConfirmationSent) {
      const customerMessage = [
        `Hi ${reservation.name}, your table reservation is confirmed!`,
        'The Coffee Chapter, Karvenagar',
        `Date: ${reservation.date}`,
        `Time: ${reservation.time}`,
        `Guests: ${reservation.guests}`,
        'We look forward to welcoming you.',
      ].join('\n')

      try {
        await configuration.client.messages.create({
          from: configuration.from,
          to: `whatsapp:${reservation.phone}`,
          body: customerMessage,
        })
        pending.customerConfirmationSent = true
      } catch (error) {
        console.error('Customer WhatsApp confirmation failed:', error.code || error.name || 'Twilio error')
        response.status(502).json({
          error: 'The owner was notified, but your WhatsApp confirmation could not be sent. Submit the same code to retry.',
        })
        return
      }
    }

    pendingReservations.delete(phone)
    response.json({
      message: 'Your WhatsApp is verified and your table reservation is confirmed. A confirmation message has been sent to you, and the owner has been notified.',
    })
  } finally {
    pending.confirmationInProgress = false
  }
})

if (existsSync(distDirectory)) {
  app.use(express.static(distDirectory))
  app.get(/^(?!\/api\/).*/, (_request, response) => {
    response.sendFile(resolve(distDirectory, 'index.html'))
  })
}

app.listen(port, () => {
  console.log(`Reservation API listening on port ${port} (${businessTimeZone})`)
})
