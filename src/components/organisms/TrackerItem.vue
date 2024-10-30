<template>
  <h2>{{ activity.id + '. ' + activity.name }}</h2>

  <FormattedTime :time-left-in-seconds="timeLeftInSeconds" />
</template>

<script setup lang="ts">
import type { ActivityType } from 'types/activityTypes'
import { onMounted, ref } from 'vue'
import FormattedTime from '../atoms/FormattedTime.vue'

const timeLeftInSeconds = ref<number>(0)

const props = defineProps<{
  activity: ActivityType
}>()

const handleCountdown = (dateTo: number): void => {
  let timeNowInSeconds: number = new Date().getTime() / 1000
  let timeLeft: number = Math.floor(dateTo - timeNowInSeconds)

  if (timeLeft <= 0) {
    timeLeftInSeconds.value = 0
  } else {
    timeLeftInSeconds.value = timeLeft
    const countownInterval: number = setInterval(() => {
      timeNowInSeconds = new Date().getTime() / 1000
      timeLeft = Math.floor(dateTo - timeNowInSeconds)

      if (dateTo - timeNowInSeconds <= 0) {
        clearInterval(countownInterval)
      } else {
        timeLeftInSeconds.value = timeLeft
      }
    }, 1000)
  }
}

onMounted(() => {
  handleCountdown(props.activity.dateTo)
})
</script>
