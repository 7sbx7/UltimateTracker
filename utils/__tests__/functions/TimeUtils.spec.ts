import { describe, it, expect } from 'vitest'
import {
  splitTime,
  formatTimeValue,
  formatActivityDurationInput,
} from '../../timeUtils' // Adjust path as needed

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

describe('formatActivityDurationInput', () => {
  it('should return the correct total seconds for HH:MM:SS format', () => {
    expect(formatActivityDurationInput('01:23:45')).toBe(5025)
  })

  it('should return the correct total seconds for MM:SS format', () => {
    expect(formatActivityDurationInput('23:45')).toBe(1425)
  })

  it('should return the correct total seconds for SS format', () => {
    expect(formatActivityDurationInput('45')).toBe(45)
  })

  it('should throw an error for empty input', () => {
    expect(() => formatActivityDurationInput('')).toThrow(
      'Invalid input: activity duration is empty.',
    )
  })

  it('should throw an error for non-numeric values in HH:MM:SS format', () => {
    expect(() => formatActivityDurationInput('01:23:xx')).toThrow(
      'Invalid input: activity duration contains non-numeric values.',
    )
  })

  it('should throw an error for non-numeric values in MM:SS format', () => {
    expect(() => formatActivityDurationInput('xx:45')).toThrow(
      'Invalid input: activity duration contains non-numeric values.',
    )
  })

  it('should throw an error for non-numeric values in SS format', () => {
    expect(() => formatActivityDurationInput('xx')).toThrow(
      'Invalid input: activity duration contains non-numeric values.',
    )
  })

  it('should throw an error for unexpected input format (too many parts)', () => {
    expect(() => formatActivityDurationInput('01:23:45:67')).toThrow(
      'Invalid input: activity duration has an unexpected format.',
    )
  })

  it('should handle single-digit seconds correctly', () => {
    expect(formatActivityDurationInput('5')).toBe(5)
  })

  it('should handle single-digit minutes and seconds correctly', () => {
    expect(formatActivityDurationInput('5:5')).toBe(305) // 5 minutes and 5 seconds
  })

  it('should handle single-digit hours, minutes, and seconds correctly', () => {
    expect(formatActivityDurationInput('1:1:1')).toBe(3661) // 1 hour, 1 minute, and 1 second
  })
})
