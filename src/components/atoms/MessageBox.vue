<template>
  <div class="message-box">
    <BaseIcon class="mb-icon" type="fa-solid fa-circle-exclamation" size="xl" />
    <p>{{ message }}</p>
  </div>
</template>

<script setup lang="ts">
import BaseIcon from '../atoms/BaseIcon.vue'

defineProps<{
  message: string
}>()
</script>

<style lang="scss" scoped>
.message-box {
  display: flex;
  align-items: center;
  background-color: color($red, error);
  padding: $pad $pad * 2;
  border-radius: $pad;
  margin: $pad * 2 0;

  .mb-icon {
    margin-right: $pad * 2;
  }
}
</style>
