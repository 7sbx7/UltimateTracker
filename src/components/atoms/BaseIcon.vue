<template>
  <i
    class="base-icon"
    :class="[type, { [`icon--size-${size}`]: size, opened: active }]"
  />
</template>

<script setup lang="ts">
defineProps<{
  active?: boolean
  type: string
  size?: string
}>()
</script>

<style scoped lang="scss">
.base-icon {
  display: block;
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

  @each $size, $pixel in $font-sizes {
    &.icon--size-#{$size} {
      font-size: $pixel;
    }
  }
}
</style>
