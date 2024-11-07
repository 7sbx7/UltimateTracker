import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import InputField from '../../atoms/InputField.vue'

describe('InputField Component', () => {
  it('renders the label, placeholder, and required attributes correctly', () => {
    const wrapper = mount(InputField, {
      props: {
        id: 'test-input',
        label: 'Test Label',
        placeholder: 'Enter text...',
        required: true,
        modelValue: '',
        type: 'text',
      },
    })

    // Check if the label renders correctly
    const label = wrapper.find('label')
    expect(label.exists()).toBe(true)
    expect(label.text()).toBe('Test Label')
    expect(label.attributes('for')).toBe('test-input')

    // Check if the input renders correctly with attributes
    const input = wrapper.find('input')
    expect(input.exists()).toBe(true)
    expect(input.attributes('id')).toBe('test-input')
    expect(input.attributes('type')).toBe('text')
    expect(input.attributes('placeholder')).toBe('Enter text...')
    expect(input.attributes('required')).toBeDefined()
  })

  // Test two-way binding with modelValue
  it('emits an update event with the correct value when input changes', async () => {
    const wrapper = mount(InputField, {
      props: {
        id: 'test-input',
        label: 'Test Label',
        modelValue: '',
        type: 'text',
      },
    })

    const input = wrapper.find('input')
    await input.setValue('new value')

    // Check if the update:modelValue event was emitted with the new value
    expect(wrapper.emitted()['update:modelValue']).toBeTruthy()
    expect(wrapper.emitted()['update:modelValue'][0]).toEqual(['new value'])
  })

  // Test input type dynamically set by prop
  it('sets the input type dynamically based on the prop', () => {
    const wrapper = mount(InputField, {
      props: {
        id: 'test-input',
        label: 'Test Label',
        type: 'email',
        modelValue: '',
      },
    })

    const input = wrapper.find('input')
    expect(input.attributes('type')).toBe('email')
  })

  // Test when required prop is false
  it('does not apply the required attribute when prop is false', () => {
    const wrapper = mount(InputField, {
      props: {
        id: 'test-input',
        label: 'Test Label',
        required: false,
        modelValue: '',
        type: 'text',
      },
    })

    const input = wrapper.find('input')
    expect(input.attributes('required')).toBeUndefined()
  })
})
