<template>
  <IconHeading
    title="Your trackers"
    icon-type="fa-solid fa-plus"
    @icon-click="openActionBox"
  />

  <TrackerActivityForm v-if="actionBoxOpened" />

  <div v-for="activity in activities" :key="activity.id">
    <h2>{{ activity.name }}</h2>
    <p>{{ activity.dateTime }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import IconHeading from '../molecules/IconHeading.vue'
import { useActivityStore } from '@/stores/activity'
import TrackerActivityForm from '../organisms/TrackerActivityForm.vue'

const actionBoxOpened = ref<boolean>(false)

const { activities } = useActivityStore()

const openActionBox = () => {
  actionBoxOpened.value = !actionBoxOpened.value
}
</script>
