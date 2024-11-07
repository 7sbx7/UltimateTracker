import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import InputActionBox from '@/components/molecules/InputActionBox.vue'
import BaseIcon from '@/components/atoms/BaseIcon.vue'
import InputField from '@/components/atoms/InputField.vue'

describe('InputActionBox', () => {
  // Test rendering with icon
  it('renders the BaseIcon when iconType is passed', () => {
    const wrapper = mount(InputActionBox, {
      props: {
        id: 'test-id',
        label: 'Test Label',
        type: 'text',
        iconType: 'test-icon',
        iconSize: 'xl',
        modelValue: '',
      },
      global: {
        components: { BaseIcon, InputField },
      },
    })

    // Check if the BaseIcon component is rendered
    const icon = wrapper.findComponent(BaseIcon)
    expect(icon.exists()).toBe(true)
    expect(icon.props('type')).toBe('test-icon')
    expect(icon.props('size')).toBe('xl')
  })

  // Test rendering without icon
  it('does not render the BaseIcon when iconType is not passed', () => {
    const wrapper = mount(InputActionBox, {
      props: {
        id: 'test-id',
        label: 'Test Label',
        type: 'text',
        modelValue: '',
      },
      global: {
        components: { BaseIcon, InputField },
      },
    })

    // Check if the BaseIcon component is not rendered
    const icon = wrapper.findComponent(BaseIcon)
    expect(icon.exists()).toBe(false)
  })

  // Test InputField rendering
  it('renders the InputField with correct props', () => {
    const wrapper = mount(InputActionBox, {
      props: {
        id: 'test-id',
        label: 'Test Label',
        type: 'text',
        placeholder: 'Enter text',
        required: true,
        modelValue: 'test value',
      },
      global: {
        components: { BaseIcon, InputField },
      },
    })

    // Check if InputField is rendered
    const inputField = wrapper.findComponent(InputField)
    expect(inputField.exists()).toBe(true)

    // Check if InputField receives the correct props
    expect(inputField.props('id')).toBe('test-id')
    expect(inputField.props('label')).toBe('Test Label')
    expect(inputField.props('type')).toBe('text')
    expect(inputField.props('placeholder')).toBe('Enter text')
    expect(inputField.props('required')).toBe(true)
    expect(inputField.props('modelValue')).toBe('test value')
  })

  // Test event emission for modelValue update
  it('emits update:modelValue when InputField emits an update', async () => {
    const wrapper = mount(InputActionBox, {
      props: {
        id: 'test-id',
        label: 'Test Label',
        type: 'text',
        modelValue: 'initial value',
      },
      global: {
        components: { BaseIcon, InputField },
      },
    })

    // Find the InputField component and trigger the input event
    const inputField = wrapper.findComponent(InputField)
    await inputField.vm.$emit('update:modelValue', 'updated value')

    // Ensure that the 'update:modelValue' event was emitted
    const emittedEvents = wrapper.emitted('update:modelValue')
    expect(emittedEvents).toBeTruthy() // Make sure the event was emitted

    // Check the first emitted value
    expect(emittedEvents?.[0]).toEqual(['updated value'])
  })
})
