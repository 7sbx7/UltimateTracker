<template>
  <header class="header">
    <i class="fas fa-bars header__icon" @click="menuOpened = !menuOpened" />
    <!-- <nav v-if="menuOpened">
      <RouterLink to="/about">About</RouterLink>
    </nav> -->
    <span class="header__logo">{{ APP_NAME }}</span>

    <RouterLink to="/"><i class="fas fa-home header__icon" /></RouterLink>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { APP_NAME } from '../../utils/constants'

// const menuOpened = ref<boolean>(false)
</script>

<style lang="scss">
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;

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

  &__icon {
    color: color($white, base);
    font-size: map-get($font-sizes, xxl);
    padding: $pad * 2;
    cursor: pointer;
  }
}
</style>
