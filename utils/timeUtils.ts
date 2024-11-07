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
