import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import IconHeading from '@/components/molecules/IconHeading.vue' // Adjust path as necessary
import BaseIcon from '@/components/atoms/BaseIcon.vue'

describe('IconHeading', () => {
  // Test rendering with props
  it('renders the title and icon correctly', () => {
    const wrapper = mount(IconHeading, {
      props: {
        title: 'Test Title',
        iconType: 'test-icon',
      },
      global: {
        components: { BaseIcon },
      },
    })

    // Check if the title renders correctly
    const title = wrapper.find('.heading-title')
    expect(title.exists()).toBe(true)
    expect(title.text()).toBe('Test Title')

    // Check if BaseIcon receives the correct props
    const baseIcon = wrapper.findComponent(BaseIcon)
    expect(baseIcon.exists()).toBe(true)
    expect(baseIcon.props('type')).toBe('test-icon')
    expect(baseIcon.props('size')).toBe('xl')
  })

  // Test event emission on icon click
  it('emits icon-click event when the icon is clicked', async () => {
    const wrapper = mount(IconHeading, {
      props: {
        title: 'Test Title',
        iconType: 'test-icon',
      },
      global: {
        components: { BaseIcon },
      },
    })

    // Find and click the icon
    const icon = wrapper.findComponent(BaseIcon)
    await icon.trigger('click')

    // Check if the 'icon-click' event was emitted
    expect(wrapper.emitted('icon-click')).toBeTruthy()
  })
})
