<template>
  <div class="ti-progress">
    <div
      class="ti-progress-bar"
      :class="{ 'ti-progress-bar--completed': completionPercentage <= 0 }"
      :style="{
        width: `${completionPercentage > 0 ? completionPercentage : 0}%`,
      }"
    />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  completionPercentage: number
}>()
</script>

<style lang="scss" scoped>
.ti-progress {
  display: block;
  width: 100%;
  margin-top: $pad;
  height: 8px;
  background-color: #e0e0e0;
  border-radius: 8px;

  .ti-progress-bar {
    border-radius: 8px;
    height: 100%;
    background-color: color($yellow, base);
    box-shadow: -8px 0px 16px 0px color($yellow, base);
    transition: 0.5s;

    &--completed {
      width: 100% !important;
      background-color: color($green, base);
      box-shadow: none;
    }
  }
}
</style>
