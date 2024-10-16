<template>
  <div class="trackers-heading">
    <h1 class="th-title">Your trackers</h1>
    <i
      class="th-icon fa-solid fa-plus"
      :class="{ opened: openActionBox }"
      @click="openActionBox = !openActionBox"
    ></i>
  </div>

  <div v-if="openActionBox" class="tracker-form">
    <form @submit.prevent="handleAddActivity">
      <div class="input-action-box">
        <i class="iab-icon fa-solid fa-hammer"></i>
        <div class="iab-input">
          <label for="inputActivityName">Activity name</label>
          <input
            id="inputActivityName"
            v-model="inputActivityName"
            type="text"
            placeholder="Activity name"
            required
          />
        </div>
      </div>

      <div class="input-action-box">
        <i class="iab-icon fa-solid fa-stopwatch"></i>
        <div class="iab-input">
          <label for="inputTimeLeft">Set the time</label>
          <input
            id="inputTimeLeft"
            v-model="inputTimeLeft"
            type="number"
            placeholder="Minutes left"
            required
          />
        </div>
      </div>

      <button class="tf-button" submit>Add Activity</button>
    </form>
  </div>

  <!-- activity box -->
  <div v-for="activity in activities" :key="activity.id">
    <h2>{{ activity.name }}</h2>
    <p>{{ activity.dateTime }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { ActivityType } from '../../../types/activityTypes'
const openActionBox = ref<boolean>(false)
const inputActivityName = ref<string>('')
const inputTimeLeft = ref<number | null>(null)

// type this lol
const activities = ref<Array<ActivityType>>([])

const handleAddActivity = () => {
  activities.value.push({
    id: activities.value.length + 1,
    name: inputActivityName.value,
    dateTime: new Date().getTime() + inputTimeLeft.value! * 60 * 1000,
  })

  resetForm()
}

const resetForm = () => {
  openActionBox.value = false
  inputActivityName.value = ''
  inputTimeLeft.value = null
}
</script>

<style scoped lang="scss">
.trackers-heading {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .th-title {
    display: block;
  }

  .th-icon {
    color: color($white, base);
    font-size: map-get($font-sizes, xl);
    cursor: pointer;
    transition: 0.3s;

    &.opened {
      text-shadow:
        0 0 $pad color($yellow, base),
        0 0 $pad color($white, base);
      transform: rotate(45deg);
    }
  }
}

.tracker-form {
  background-color: color($gray, tone-1);
  // border: 2px solid color($yellow, base);
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

  .input-action-box {
    background-color: transparent;
    border: 1px solid color($yellow, base);
    border-radius: $pad * 0.5;
    padding: $pad;
    margin-bottom: $pad;

    display: flex;
    align-items: center;

    .iab-icon {
      font-size: map-get($font-sizes, xxl);
      margin-right: $pad * 2;
    }

    .iab-input {
      display: flex;
      flex-direction: column;

      input {
        background: transparent;
        border: none;
        height: $pad * 3;
        font-size: map-get($font-sizes, xl);
        &:focus {
          outline: none;
        }
      }
    }
  }
}
</style>
