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
      />
      <InputActionBox
        id="inputTimeLeft"
        type="number"
        label="Activity duration"
        placeholder="Type in your activity duration"
        icon-type="fa-solid fa-stopwatch"
        icon-size="xxl"
        v-model="activityDuration"
      />

      <button class="tf-button" submit>Add Activity</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useIndexedDB } from '../../../utils/indexedDB'
import InputActionBox from '../molecules/InputActionBox.vue'

const emit = defineEmits(['activity-added'])
const { addItem } = useIndexedDB('activities')

const activityName = ref<string>('')
const activityDuration = ref<number | null>(null)

const handleAddActivity = async () => {
  try {
    await addItem({
      name: activityName.value,
      dateTo: Math.round(
        (new Date().getTime() + activityDuration.value! * 1000) / 1000,
      ),
    })
    emit('activity-added')
  } catch (error) {
    console.error(error)
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
