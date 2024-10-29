<template>
  <h2>{{ activity.name }}</h2>
  <p>{{ timeLeft }}</p>
</template>

<script setup lang="ts">
import type { ActivityType } from 'types/activityTypes'
import { onMounted, ref } from 'vue'
const timeLeft = ref<number>(0)

const props = defineProps<{
  activity: ActivityType
}>()

const handleCountdown = (dateTo: number): void => {
  let timeNowInSeconds: number = new Date().getTime() / 1000
  timeLeft.value = Math.round(dateTo - timeNowInSeconds)

  const countownInterval: number = setInterval(() => {
    timeNowInSeconds = new Date().getTime() / 1000
    if (dateTo - timeNowInSeconds <= 0) {
      timeLeft.value = 0
      clearInterval(countownInterval)
    } else {
      timeLeft.value = Math.round(dateTo - timeNowInSeconds)
    }
  }, 1000)
}

onMounted(() => {
  handleCountdown(props.activity.dateTo)
})
</script>
