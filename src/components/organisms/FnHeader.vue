<template>
  <header class="header">
    <span class="header__logo">{{ APP_NAME }}</span>
  </header>
  <TabsNavigation />
</template>

<script setup lang="ts">
import { APP_NAME } from '../../../utils/constants'
import TabsNavigation from '../molecules/TabsNavigation.vue'
</script>

<style lang="scss">
.header {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: $pad * 3;

  &__logo {
    text-transform: uppercase;
    letter-spacing: 3px;
    font-size: map-get($font-sizes, xl);
    text-shadow:
      0 0 $pad color($yellow, base),
      0 0 $pad color($white, base);
    font-weight: 800;
    color: color($gray, base);
  }
}
</style>
