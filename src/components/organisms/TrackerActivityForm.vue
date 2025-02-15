<template>
  <div class="tracker-form">
    <!-- TrackerForm component -->
    <form @submit.prevent="handleAddActivity">
      <InputActionBox
        id="inputActivityName"
        type="string"
        label="Activity name"
        placeholder="Type in your activity name"
        icon-type="fa-solid fa-hammer"
        icon-size="xxl"
        v-model="activityName"
        required
      />
      <InputActionBox
        id="inputTimeLeft"
        type="string"
        label="Activity duration"
        placeholder="Type in your activity duration"
        icon-type="fa-solid fa-stopwatch"
        icon-size="xxl"
        v-model="activityDuration"
        required
      />
      <MessageBox v-for="error in errors" :key="error" :message="error" />
      <button class="tf-button" submit>Add Activity</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useIndexedDB } from '../../../utils/indexedDB'
import InputActionBox from '../molecules/InputActionBox.vue'
import { formatActivityDurationInput } from '../../../utils/timeUtils'
import MessageBox from '../atoms/MessageBox.vue'
const emit = defineEmits(['activity-added'])
const { addItem } = useIndexedDB('activities')

const activityName = ref<string>('')
const activityDuration = ref<string>('')
const errors = ref<string[]>([])

const handleAddActivity = async () => {
  try {
    errors.value = []
    await addItem({
      name: activityName.value,
      dateTo: Math.round(
        (new Date().getTime() +
          formatActivityDurationInput(activityDuration.value) * 1000) /
          1000,
      ),
      durationInSeconds: formatActivityDurationInput(activityDuration.value),
    })
    emit('activity-added')
  } catch (error: unknown) {
    if (error instanceof Error) {
      errors.value.push(error.message)
    } else {
      errors.value.push(String(error))
    }
  }
}
</script>

<style scoped lang="scss">
.tracker-form {
  background-color: color($gray, tone-1);
  border-radius: $pad * 3 $pad * 3 0;
  padding: $pad * 2;
  margin: $pad * 2 0;

  form {
    display: flex;
    flex-direction: column;

    .tf-button {
      outline: none;
      border: none;
      padding: $pad * 1.5;
      background-color: color($yellow, base);
      color: color($gray, tone-1);
      border-radius: $pad;
      cursor: pointer;
      transition: 0.2s;

      &:hover {
        background-color: color($yellow, tone-2);
      }
    }
  }
}
</style>
