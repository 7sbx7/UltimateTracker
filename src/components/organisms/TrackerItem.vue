<template>
  <div class="tracker-item">
    <div class="ti-content">
      <h2>{{ activity.name }}</h2>
      <FormattedTime :time-left-in-seconds="timeLeftInSeconds" />
    </div>

    <BaseIcon
      class="ti-icon"
      type="fa-solid fa-trash"
      size="xl"
      @click="handleItemDelete(activity.id!)"
    />
  </div>
</template>

<script setup lang="ts">
import type { ActivityType } from 'types/activityTypes'
import { onMounted, ref } from 'vue'
import { useIndexedDB } from '../../../utils/indexedDB'
import FormattedTime from '../atoms/FormattedTime.vue'
import BaseIcon from '../atoms/BaseIcon.vue'

const emit = defineEmits(['activity-deleted'])

const timeLeftInSeconds = ref<number>(0)

const props = defineProps<{
  activity: ActivityType
}>()

const handleItemDelete = (id: number) => {
  const { removeItem } = useIndexedDB('activities')
  removeItem(id)
  emit('activity-deleted')
}

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

<style lang="scss" scoped>
.tracker-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: $pad * 2 0;
  padding: $pad;
  border-bottom: 1px solid color($gray, tone-3);
}
</style>
