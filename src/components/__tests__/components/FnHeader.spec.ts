import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import FnHeader from '@/components/organisms/FnHeader.vue'
import { APP_NAME } from '../../../../utils/constants'

describe('FnHeader', () => {
  it('renders the header with the correct logo name', () => {
    const wrapper = mount(FnHeader)

    const logo = wrapper.find('.header__logo')
    expect(logo.exists()).toBe(true)
    expect(logo.text()).toBe(APP_NAME)
  })
})
