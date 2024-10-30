<template>
  <span>{{ timeFormatted }}</span>
</template>

<script setup lang="ts">
import type { ActivityDurationType } from 'types/activityTypes'
import { computed } from 'vue'

const props = defineProps<{
  timeLeftInSeconds: number
}>()

const timeFormatted = computed((): string => {
  const { hours, minutes, seconds } = splitTime(props.timeLeftInSeconds)
  const timeString: string = `${formatTimeValue(hours)}:${formatTimeValue(minutes)}:${formatTimeValue(seconds)}`

  return timeString
})

const splitTime = (timeLeftInSeconds: number): ActivityDurationType => {
  const hours: number = Math.floor(timeLeftInSeconds / 3600)
  const minutes: number = Math.floor((timeLeftInSeconds % 3600) / 60)
  const seconds: number = Math.floor(timeLeftInSeconds % 60)

  return {
    hours,
    minutes,
    seconds,
  }
}

const formatTimeValue = (value: number): string => {
  return value < 10 ? '0' + value : value.toString()
}
</script>
