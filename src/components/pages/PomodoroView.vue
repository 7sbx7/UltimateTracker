<template>
  <TrackerItem :activity="activity" pomodoro />
</template>

<script setup lang="ts">
import TrackerItem from '../organisms/TrackerItem.vue'

const activity = {
  name: 'pomodoro',
  dateTo: 1732039024,
  durationInSeconds: 9000,
}
</script>
