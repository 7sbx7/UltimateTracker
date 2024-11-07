import { describe, it, expect } from 'vitest'
import { splitTime, formatTimeValue } from '../../timeUtils' // Adjust path as needed

describe('splitTime function', () => {
  it('splits 3661 seconds into hours, minutes, and seconds', () => {
    const { hours, minutes, seconds } = splitTime(3661)
    expect(hours).toBe(1)
    expect(minutes).toBe(1)
    expect(seconds).toBe(1)
  })

  it('splits less than an hour correctly', () => {
    const { hours, minutes, seconds } = splitTime(3599)
    expect(hours).toBe(0)
    expect(minutes).toBe(59)
    expect(seconds).toBe(59)
  })

  it('splits less than a minute correctly', () => {
    const { hours, minutes, seconds } = splitTime(45)
    expect(hours).toBe(0)
    expect(minutes).toBe(0)
    expect(seconds).toBe(45)
  })

  it('splits zero seconds correctly', () => {
    const { hours, minutes, seconds } = splitTime(0)
    expect(hours).toBe(0)
    expect(minutes).toBe(0)
    expect(seconds).toBe(0)
  })
})

// Test cases for the formatTimeValue function
describe('formatTimeValue function', () => {
  it('formats single-digit numbers with a leading zero', () => {
    expect(formatTimeValue(5)).toBe('05')
  })

  it('formats double-digit numbers without changes', () => {
    expect(formatTimeValue(12)).toBe('12')
  })

  it('formats zero correctly', () => {
    expect(formatTimeValue(0)).toBe('00')
  })
})
