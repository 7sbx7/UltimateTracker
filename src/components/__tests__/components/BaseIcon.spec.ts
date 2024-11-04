import { it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

import BaseIcon from '@/components/atoms/BaseIcon.vue'
const classes = 'fa-solid fa-plus'
const fontSizes = ['xxs', 'xs', 's', 'm', 'l', 'xl']

it('renders properly', () => {
  const wrapper = mount(BaseIcon, { props: { type: classes } })
  expect(wrapper.exists()).toBe(true)
})

it('renders icon type classes properly', () => {
  const wrapper = mount(BaseIcon, { props: { type: classes } })
  expect(wrapper.classes().toString()).toContain(classes.split(' ').toString())
})

it('renders opened class when active is true', () => {
  const wrapper = mount(BaseIcon, { props: { type: classes, active: true } })
  expect(wrapper.classes()).toContain('opened')
})

it('doesnt render opened class when active is false', () => {
  const wrapper = mount(BaseIcon, { props: { type: classes, active: false } })
  expect(wrapper.classes()).not.toContain('opened')
})

it.each(fontSizes.map(size => ({ size, sizeClass: `icon--size-${size}` })))(
  'renders $size size icon class as $sizeClass properly',
  ({ size, sizeClass }) => {
    const wrapper = mount(BaseIcon, { props: { type: 'icon', size } })
    expect(wrapper.classes()).toContain(sizeClass)
  },
)

it('does not render icon size classes when prop is missing', () => {
  const wrapper = mount(BaseIcon, { props: { type: classes } })
  expect(wrapper.classes()).not.toContain('icon--size-xl')
})
