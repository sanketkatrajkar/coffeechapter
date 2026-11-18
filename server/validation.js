const PHONE_PATTERN = /^\+[1-9]\d{7,14}$/
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/
const TIME_PATTERN = /^(?:[01]\d|2[0-3]):[0-5]\d$/

function currentLocalMinute(timeZone, now) {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(now)
  const values = Object.fromEntries(parts.map(({ type, value }) => [type, value]))
  return `${values.year}-${values.month}-${values.day}T${values.hour}:${values.minute}`
}

function isValidDate(date) {
  if (!DATE_PATTERN.test(date)) return false
  const [year, month, day] = date.split('-').map(Number)
  const parsed = new Date(Date.UTC(year, month - 1, day))
  return (
    parsed.getUTCFullYear() === year &&
    parsed.getUTCMonth() === month - 1 &&
    parsed.getUTCDate() === day
  )
}

export function validateReservation(input, {
  now = new Date(),
  timeZone = process.env.BUSINESS_TIME_ZONE || 'Asia/Kolkata',
} = {}) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) {
    return { error: 'Please provide your booking details.' }
  }

  const name = typeof input.name === 'string'
    ? Array.from(input.name, (character) => {
      const codePoint = character.codePointAt(0)
      return codePoint < 32 || codePoint === 127 ? ' ' : character
    }).join('').replace(/\s+/g, ' ').trim()
    : ''
  const phone = typeof input.phone === 'string' ? input.phone.trim() : ''
  const date = typeof input.date === 'string' ? input.date : ''
  const time = typeof input.time === 'string' ? input.time : ''
  const guests = Number(input.guests)

  if (name.length < 2 || name.length > 80) {
    return { error: 'Enter a name between 2 and 80 characters.' }
  }
  if (!PHONE_PATTERN.test(phone)) {
    return { error: 'Enter a valid WhatsApp number with country code, such as +919876543210.' }
  }
  if (!isValidDate(date) || !TIME_PATTERN.test(time)) {
    return { error: 'Choose a valid date and time for your visit.' }
  }
  if (!Number.isInteger(guests) || guests < 1 || guests > 99) {
    return { error: 'Guest count must be between 1 and 99.' }
  }

  try {
    const requestedLocalMinute = `${date}T${time}`
    if (requestedLocalMinute <= currentLocalMinute(timeZone, now)) {
      return { error: 'Choose a future date and time.' }
    }
  } catch (error) {
    if (error instanceof RangeError) {
      throw new Error(`Invalid BUSINESS_TIME_ZONE setting: ${timeZone}`)
    }
    throw error
  }

  return {
    value: {
      name,
      phone,
      date,
      time,
      guests,
      outlet: 'Karvenagar',
    },
  }
}
