import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import FormattedTime from '@/components/atoms/FormattedTime.vue' // Adjust path as needed

describe('FormattedTime', () => {
  // Test cases for the computed property
  it('displays formatted time as HH:MM:SS', () => {
    const wrapper = mount(FormattedTime, {
      props: { timeLeftInSeconds: 3661 },
    })
    expect(wrapper.text()).toBe('01:01:01')
  })

  it('displays correctly when time is less than one hour', () => {
    const wrapper = mount(FormattedTime, {
      props: { timeLeftInSeconds: 3599 },
    })
    expect(wrapper.text()).toBe('00:59:59')
  })

  it('displays correctly when time is less than one minute', () => {
    const wrapper = mount(FormattedTime, {
      props: { timeLeftInSeconds: 45 },
    })
    expect(wrapper.text()).toBe('00:00:45')
  })

  it('displays correctly for exactly zero seconds', () => {
    const wrapper = mount(FormattedTime, {
      props: { timeLeftInSeconds: 0 },
    })
    expect(wrapper.text()).toBe('00:00:00')
  })
})
