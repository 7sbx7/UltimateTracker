<template>
  <IconHeading
    title="Your trackers"
    icon-type="fa-solid fa-plus"
    @icon-click="toggleActionBox"
  />

  <TrackerActivityForm
    v-if="actionBoxOpened"
    @activity-added="handleAddedActivity"
  />

  <TrackerItem
    v-for="activity in activities"
    :key="activity.id"
    :activity="activity"
  />
</template>

<script setup lang="ts">
import type { ActivityType } from 'types/activityTypes'
import { onMounted, ref } from 'vue'
import { useIndexedDB } from '../../../utils/indexedDB'
import IconHeading from '../molecules/IconHeading.vue'
import TrackerActivityForm from '../organisms/TrackerActivityForm.vue'
import TrackerItem from '../organisms/TrackerItem.vue'

const { getAllItems } = useIndexedDB('activities')

const actionBoxOpened = ref<boolean>(false)
const activities = ref<ActivityType[]>([])

onMounted(async () => {
  activities.value = await getAllItems()
})
const handleAddedActivity = async () => {
  activities.value = await getAllItems()
  toggleActionBox()
}
const toggleActionBox = () => {
  actionBoxOpened.value = !actionBoxOpened.value
}
</script>
