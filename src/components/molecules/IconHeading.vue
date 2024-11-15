<template>
  <div class="heading">
    <h1 ref="title" class="heading-title">{{ title }}</h1>
    <BaseIcon :type="iconType" size="xl" @click="$emit('icon-click')" />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import BaseIcon from '../atoms/BaseIcon.vue'

defineProps<{
  title: string
  iconType: string
}>()
</script>

<style lang="scss">
.heading {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .heading-title {
    display: block;
  }
}
</style>
