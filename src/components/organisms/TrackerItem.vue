<template>
  <div
    class="tracker-item"
    :class="{ 'tracker-item--completed': activityFinished }"
  >
    <div class="ti-content">
      <h2 class="ti-title">
        {{ activity.name }}
        <span class="ti-completed" v-if="activityFinished">completed</span>
      </h2>
      <FormattedTime :time-left-in-seconds="timeLeftInSeconds" />
    </div>

    <BaseIcon
      class="ti-icon"
      type="fa-solid fa-trash"
      size="xl"
      @click="handleItemDelete(activity.id!)"
    />

    <ProgressBar
      :completion-percentage="completionPercentage"
      :activity-finished="activityFinished"
    />
  </div>
</template>

<script setup lang="ts">
import type { ActivityType } from 'types/activityTypes'
import { computed, onMounted, ref } from 'vue'
import { useIndexedDB } from '../../../utils/indexedDB'
import FormattedTime from '../atoms/FormattedTime.vue'
import BaseIcon from '../atoms/BaseIcon.vue'
import ProgressBar from '../molecules/ProgressBar.vue'

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

const completionPercentage = computed(() => {
  return (timeLeftInSeconds.value / props.activity.durationInSeconds) * 100
})

const activityFinished = computed(() => {
  return timeLeftInSeconds.value <= 0
})

onMounted(() => {
  handleCountdown(props.activity.dateTo)
})
</script>

<style lang="scss" scoped>
.tracker-item {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
  margin: $pad * 2 0;
  padding: $pad 0;
  border-bottom: 1px solid color($gray, tone-3);

  .ti-title {
    display: flex;
    align-items: center;
    text-transform: capitalize;
  }

  .ti-completed {
    margin-left: $pad * 2;
    text-transform: uppercase;
    font-size: map-get($font-sizes, s);
    color: color($green, base);
  }
}
</style>
