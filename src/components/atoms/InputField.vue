<template>
  <div class="iab-input">
    <label :for="id">{{ label }}</label>
    <input
      :id="id"
      :type="type"
      :placeholder="placeholder"
      :required="required"
      :value="modelValue"
      @input="
        $emit('update:modelValue', ($event.target as HTMLInputElement).value)
      "
    />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  id: string
  label?: string
  type: string
  placeholder?: string
  required?: boolean
  modelValue: string | number | null
}>()
</script>

<style scoped lang="scss">
.iab-input {
  display: flex;
  flex-direction: column;
  width: 100%;

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
</style>
