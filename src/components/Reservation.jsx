import { useEffect, useState } from 'react'
import { ArrowRight, CalendarDays, CheckCircle2, Clock3, MapPin, MessageCircle } from 'lucide-react'
import './Reservation.css'

const emptyBooking = {
  name: '',
  countryCode: '+91',
  phone: '',
  date: '',
  time: '',
  guests: '2',
}

function getTodayInIndia() {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(new Date())
  const part = (type) => parts.find((item) => item.type === type)?.value
  return `${part('year')}-${part('month')}-${part('day')}`
}

async function postReservation(endpoint, payload) {
  let response
  try {
    response = await fetch(`${import.meta.env.VITE_API_BASE_URL || ''}/api/reservations/${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
  } catch {
    throw new Error('Booking service is unavailable. Please try again later.')
  }

  const result = await response.json().catch(() => ({}))
  if (!response.ok) {
    throw new Error(result.error || 'We could not process your request. Please try again.')
  }
  return result
}

function Reservation() {
  const [booking, setBooking] = useState(emptyBooking)
  const [code, setCode] = useState('')
  const [phase, setPhase] = useState('details')
  const [isLoading, setIsLoading] = useState(false)
  const [notice, setNotice] = useState({ type: '', text: '' })
  const [setupNotice, setSetupNotice] = useState('')
  const today = getTodayInIndia()
  const whatsappPhone = `${booking.countryCode}${booking.phone.replace(/\D/g, '').replace(/^0+/, '')}`

  useEffect(() => {
    let isCurrent = true
    fetch(`${import.meta.env.VITE_API_BASE_URL || ''}/api/reservations/status`)
      .then(async (response) => {
        if (!response.ok) return
        const status = await response.json()
        if (isCurrent && status.configured === false) {
          setSetupNotice(status.message || 'WhatsApp booking is not configured yet. Please contact the cafe directly.')
        }
      })
      .catch(() => {
        if (isCurrent) {
          setSetupNotice('Booking service is unavailable. Please contact the cafe directly.')
        }
      })

    return () => {
      isCurrent = false
    }
  }, [])

  const updateBooking = (event) => {
    setBooking((current) => ({ ...current, [event.target.name]: event.target.value }))
  }

  const requestCode = async (event) => {
    event?.preventDefault()
    setNotice({ type: '', text: '' })
    setIsLoading(true)
    try {
      const result = await postReservation('send-code', {
        ...booking,
        phone: whatsappPhone,
        guests: Number(booking.guests),
      })
      setPhase('code')
      setNotice({ type: 'success', text: result.message })
    } catch (error) {
      setNotice({ type: 'error', text: error.message })
    } finally {
      setIsLoading(false)
    }
  }

  const confirmBooking = async (event) => {
    event.preventDefault()
    setNotice({ type: '', text: '' })
    setIsLoading(true)
    try {
      const result = await postReservation('confirm', {
        phone: whatsappPhone,
        code,
      })
      setPhase('done')
      setNotice({ type: 'success', text: result.message })
    } catch (error) {
      setNotice({ type: 'error', text: error.message })
    } finally {
      setIsLoading(false)
    }
  }

  const startOver = () => {
    setBooking(emptyBooking)
    setCode('')
    setPhase('details')
    setNotice({ type: '', text: '' })
  }

  return (
    <section className="reservation-section" id="reserve">
      <div className="reservation-shell">
        <div className="reservation-intro">
          <p className="reservation-eyebrow">A table is waiting</p>
          <h2>Make it a date<br />with <em>good coffee.</em></h2>
          <p>
            Tell us when you’d like to visit. Verify your WhatsApp number to
            confirm your table and notify our cafe team.
          </p>
          <div className="reservation-outlet">
            <span className="reservation-outlet-icon">
              <MapPin size={20} aria-hidden="true" />
            </span>
            <span>
              <strong>Our outlet</strong>
              <span>Karvenagar</span>
            </span>
          </div>
          <p className="reservation-hours-note">
            Your reservation is confirmed after successful WhatsApp verification.
          </p>
        </div>

        <div className="reservation-card">
          {setupNotice && (
            <p className="reservation-notice error reservation-setup-notice" role="alert">
              {setupNotice}
            </p>
          )}
          {phase === 'done' ? (
            <div className="reservation-success">
              <span className="reservation-success-icon">
                <CheckCircle2 size={32} aria-hidden="true" />
              </span>
              <p className="reservation-form-eyebrow">Reservation confirmed</p>
              <h3>Thanks, {booking.name}.</h3>
              <p>{notice.text}</p>
              <div className="reservation-summary">
                <span><CalendarDays size={16} aria-hidden="true" />{booking.date} at {booking.time}</span>
                <span><MapPin size={16} aria-hidden="true" />Karvenagar · {booking.guests} guests</span>
              </div>
              <button className="reservation-reset" type="button" onClick={startOver}>
                Make another reservation
              </button>
            </div>
          ) : phase === 'code' ? (
            <form className="reservation-form" onSubmit={confirmBooking}>
              <p className="reservation-form-eyebrow">Step 2 of 2</p>
              <h3>Verify your WhatsApp</h3>
              <p className="reservation-form-description">
                Enter the verification code sent to <strong>{whatsappPhone}</strong>.
                After verification, we’ll send confirmation to you and notify the owner.
              </p>
              {notice.text && (
                <p className={`reservation-notice ${notice.type}`} role={notice.type === 'error' ? 'alert' : 'status'} aria-live={notice.type === 'error' ? 'assertive' : 'polite'}>
                  {notice.text}
                </p>
              )}
              <label className="reservation-field">
                <span>Verification code</span>
                <input
                  autoComplete="one-time-code"
                  inputMode="numeric"
                  maxLength={10}
                  name="code"
                  onChange={(event) => setCode(event.target.value.replace(/\D/g, ''))}
                  pattern="[0-9]{4,10}"
                  placeholder="Enter your code"
                  required
                  value={code}
                />
              </label>
              <button className="reservation-submit" type="submit" disabled={isLoading}>
                {isLoading ? 'Verifying…' : 'Verify & confirm reservation'}
                {!isLoading && <ArrowRight size={17} aria-hidden="true" />}
              </button>
              <div className="reservation-code-actions">
                <button type="button" onClick={requestCode} disabled={isLoading}>
                  Send a new code
                </button>
                <button type="button" onClick={() => {
                  setPhase('details')
                  setNotice({ type: '', text: '' })
                }}>
                  Edit booking details
                </button>
              </div>
            </form>
          ) : (
            <form className="reservation-form" onSubmit={requestCode}>
              <p className="reservation-form-eyebrow">Step 1 of 2</p>
              <h3>Plan your visit</h3>
              <div className="reservation-fields">
                <label className="reservation-field reservation-field-wide">
                  <span>Your name</span>
                  <input
                    autoComplete="name"
                    maxLength={80}
                    name="name"
                    onChange={updateBooking}
                    placeholder="Name for the booking"
                    required
                    value={booking.name}
                  />
                </label>
                <div className="reservation-field reservation-field-wide">
                  <label htmlFor="phone-number">WhatsApp number</label>
                  <div className="reservation-phone-input">
                    <select
                      aria-label="Country calling code"
                      autoComplete="tel-country-code"
                      id="phone-country-code"
                      name="countryCode"
                      onChange={updateBooking}
                      value={booking.countryCode}
                    >
                      <option value="+91">India (+91)</option>
                      <option value="+1">United States/Canada (+1)</option>
                      <option value="+44">United Kingdom (+44)</option>
                      <option value="+61">Australia (+61)</option>
                      <option value="+971">United Arab Emirates (+971)</option>
                    </select>
                    <input
                      autoComplete="tel-national"
                      id="phone-number"
                      inputMode="numeric"
                      maxLength={14}
                      name="phone"
                      onChange={(event) => {
                        setBooking((current) => ({
                          ...current,
                          phone: event.target.value.replace(/\D/g, ''),
                        }))
                      }}
                      pattern="[0-9]{7,14}"
                      placeholder="98765 43210"
                      required
                      title="Enter your phone number without the country code"
                      type="tel"
                      value={booking.phone}
                    />
                  </div>
                  <small>We’ll send a WhatsApp verification code to this number.</small>
                </div>
                <label className="reservation-field">
                  <span>Date</span>
                  <input
                    min={today}
                    name="date"
                    onChange={updateBooking}
                    required
                    type="date"
                    value={booking.date}
                  />
                </label>
                <label className="reservation-field">
                  <span>Time</span>
                  <input
                    name="time"
                    onChange={updateBooking}
                    required
                    step="900"
                    type="time"
                    value={booking.time}
                  />
                </label>
                <label className="reservation-field reservation-field-wide">
                  <span>Number of guests</span>
                  <input
                    max="99"
                    min="1"
                    name="guests"
                    onChange={updateBooking}
                    required
                    type="number"
                    value={booking.guests}
                  />
                </label>
              </div>
              <div className="reservation-whatsapp-note">
                <MessageCircle size={18} aria-hidden="true" />
                <span>
                  <strong>WhatsApp verification</strong>
                  <small>Your booking code will be sent to {whatsappPhone}.</small>
                </span>
              </div>
              {notice.text && (
                <p className={`reservation-notice ${notice.type}`} role={notice.type === 'error' ? 'alert' : 'status'} aria-live={notice.type === 'error' ? 'assertive' : 'polite'}>
                  {notice.text}
                </p>
              )}
              <button className="reservation-submit" type="submit" disabled={isLoading}>
                {isLoading ? 'Sending code…' : 'Get WhatsApp verification code'}
                {!isLoading && <ArrowRight size={17} aria-hidden="true" />}
              </button>
              <p className="reservation-privacy">
                <Clock3 size={14} aria-hidden="true" />
                Your table is confirmed only after WhatsApp verification succeeds.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

export default Reservation
