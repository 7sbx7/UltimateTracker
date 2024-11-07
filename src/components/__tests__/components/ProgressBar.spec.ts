import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import ProgressBar from '@/components/molecules/ProgressBar.vue' // Adjust the import path as needed

describe('ProgressBar', () => {
  // Test for when the progress bar is not completed
  it('renders with the correct width based on completionPercentage', () => {
    const wrapper = mount(ProgressBar, {
      props: {
        completionPercentage: 50,
      },
    })

    const progressBar = wrapper.find('.ti-progress-bar')
    expect(progressBar.exists()).toBe(true)

    // Check if the style width is set to '50%'
    expect(progressBar.attributes('style')).toBe('width: 50%;')

    // The bar should not have the 'completed' class
    expect(progressBar.classes()).not.toContain('ti-progress-bar--completed')
  })

  // Test for when the activity is completed (0% width and completed class)
  it('renders with 100% width and completed class when completionPercentage <= 0', () => {
    const wrapper = mount(ProgressBar, {
      props: {
        completionPercentage: 0,
      },
    })

    const progressBar = wrapper.find('.ti-progress-bar')

    // Check if the style width is set to '0%'
    expect(progressBar.attributes('style')).toBe('width: 0%;')

    // The bar should have the 'completed' class
    expect(progressBar.classes()).toContain('ti-progress-bar--completed')
  })

  // Test for when the completion percentage is 100
  it('renders with 100% width when completionPercentage is 100', () => {
    const wrapper = mount(ProgressBar, {
      props: {
        completionPercentage: 100,
      },
    })

    const progressBar = wrapper.find('.ti-progress-bar')

    // Check if the style width is set to '100%'
    expect(progressBar.attributes('style')).toBe('width: 100%;')

    // The bar should not have the 'completed' class (since percentage is greater than 0)
    expect(progressBar.classes()).not.toContain('ti-progress-bar--completed')
  })

  // Test for when the completion percentage is negative (edge case)
  it('renders with 0% width and completed class when completionPercentage is negative', () => {
    const wrapper = mount(ProgressBar, {
      props: {
        completionPercentage: -10,
      },
    })

    const progressBar = wrapper.find('.ti-progress-bar')

    // Check if the style width is set to '0%' (negative percentage treated as 0)
    expect(progressBar.attributes('style')).toBe('width: 0%;')

    // The bar should have the 'completed' class
    expect(progressBar.classes()).toContain('ti-progress-bar--completed')
  })
})
