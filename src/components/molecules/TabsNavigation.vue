<template>
  <nav class="tabs">
    <router-link to="/" class="tabs__item" :class="{ active: isTabActive('/') }"
      >Tracker</router-link
    >
    <router-link
      to="/pomodoro"
      class="tabs__item"
      :class="{ active: isTabActive('/pomodoro') }"
      >Pomodoro</router-link
    >
  </nav>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()

const isTabActive = (path: string): boolean => {
  return path === route.path
}
</script>

<style scoped lang="scss">
.tabs {
  margin-bottom: $pad * 3;

  &__item {
    display: inline-block;
    width: 50%;
    text-align: center;
    padding: $pad * 2;
    cursor: pointer;
    text-transform: uppercase;
    font-weight: 800;
    border-radius: 4px;
    text-decoration: none;

    &.active {
      background-color: color($yellow, tone-2);
      color: color($gray, base);
    }
  }
}
</style>
