<template>
  <div class="input-action-box">
    <BaseIcon
      v-if="iconType"
      class="iab-icon"
      :type="iconType"
      :size="iconSize"
    />
    <InputField
      :id="id"
      class="iab-input"
      :label="label"
      :type="type"
      :placeholder="placeholder"
      :required="required"
      :modelValue="modelValue"
      @update:modelValue="value => $emit('update:modelValue', value)"
    />
  </div>
</template>

<script setup lang="ts">
import BaseIcon from '../atoms/BaseIcon.vue'
import InputField from '../atoms/InputField.vue'

defineProps<{
  id: string
  type: string
  label: string
  placeholder?: string
  required?: boolean
  iconType?: string
  iconSize?: string
  modelValue: string | number
}>()
</script>

<style scoped lang="scss">
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
</style>
