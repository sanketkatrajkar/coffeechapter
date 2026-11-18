import test from 'node:test'
import assert from 'node:assert/strict'
import { validateReservation } from './validation.js'

const now = new Date('2026-01-01T04:00:00.000Z')
const validInput = {
  name: 'Coffee Guest',
  phone: '+919876543210',
  date: '2026-01-01',
  time: '10:00',
  guests: 3,
}

test('accepts a future booking and fixes the outlet to Karvenagar', () => {
  const result = validateReservation(validInput, { now })

  assert.equal(result.error, undefined)
  assert.equal(result.value.outlet, 'Karvenagar')
  assert.equal(result.value.guests, 3)
})

test('rejects invalid phone numbers and booking dates', () => {
  assert.match(
    validateReservation({ ...validInput, phone: '9876543210' }, { now }).error,
    /country code/,
  )
  assert.match(
    validateReservation({ ...validInput, date: '2026-02-30' }, { now }).error,
    /valid date and time/,
  )
})

test('rejects a booking time that has already passed in the outlet timezone', () => {
  const result = validateReservation(
    { ...validInput, time: '09:29' },
    { now },
  )

  assert.match(result.error, /future date and time/)
})

test('rejects invalid guest counts and malformed request bodies', () => {
  assert.match(
    validateReservation({ ...validInput, guests: 0 }, { now }).error,
    /Guest count/,
  )
  assert.match(validateReservation(null, { now }).error, /booking details/)
})
