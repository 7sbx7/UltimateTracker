<template>
  <span>{{ timeFormatted }}</span>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { splitTime, formatTimeValue } from '../../../utils/timeUtils'

const props = defineProps<{
  timeLeftInSeconds: number
}>()

const timeFormatted = computed((): string => {
  const { hours, minutes, seconds } = splitTime(props.timeLeftInSeconds)
  const timeString: string = `${formatTimeValue(hours)}:${formatTimeValue(minutes)}:${formatTimeValue(seconds)}`

  return timeString
})
</script>
