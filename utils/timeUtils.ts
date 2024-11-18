import type { ActivityDurationType } from 'types/activityTypes'

export const splitTime = (timeLeftInSeconds: number): ActivityDurationType => {
  const hours = Math.floor(timeLeftInSeconds / 3600)
  const minutes = Math.floor((timeLeftInSeconds % 3600) / 60)
  const seconds = Math.floor(timeLeftInSeconds % 60)

  return {
    hours,
    minutes,
    seconds,
  }
}

export const formatTimeValue = (value: number): string => {
  return value < 10 ? '0' + value : value.toString()
}

export const formatActivityDurationInput = (
  activityDuration: string,
): number => {
  if (!activityDuration) {
    throw new Error('Invalid input: activity duration is empty.')
  }

  const inputParts = activityDuration.split(':')
  const areAllPartsNumbers = inputParts.every(part => /^\d+$/.test(part))

  if (!areAllPartsNumbers) {
    throw new Error(
      'Invalid input: activity duration contains non-numeric values.',
    )
  }

  if (inputParts.length === 3) {
    const [hours, minutes, seconds] = inputParts
    return Number(hours) * 60 * 60 + Number(minutes) * 60 + Number(seconds)
  } else if (inputParts.length == 2) {
    const [minutes, seconds] = inputParts
    return Number(minutes) * 60 + Number(seconds)
  } else if (inputParts.length === 1) {
    return Number(inputParts[0])
  }

  throw new Error('Invalid input: activity duration has an unexpected format.')
}
