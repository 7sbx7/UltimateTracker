import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import HomeView from '../../../src/components/pages/HomeView.vue'
import PomodoroView from '../../../src/components/pages/PomodoroView.vue'
import router from '../../../src/router/index'

// Mock the useIndexedDB function
vi.mock('../../../utils/indexedDB', () => ({
  useIndexedDB: vi.fn().mockReturnValue({
    getAllItems: vi.fn().mockResolvedValue([
      {
        id: 1,
        name: 'Activity 1',
        dateTo: 1731921901,
        durationInSeconds: 3600,
      },
      {
        id: 2,
        name: 'Activity 2',
        dateTo: 1731923123,
        durationInSeconds: 1200,
      },
    ]),
  }),
}))

describe('Router', () => {
  it('should navigate to HomeView', async () => {
    const wrapper = mount(HomeView, {
      global: {
        plugins: [router],
      },
    })
    router.push('/')
    await router.isReady()
    expect(wrapper.html()).toContain('Your trackers')
  })

  it('should navigate to Pomodoro View', async () => {
    const wrapper = mount(PomodoroView, {
      global: {
        plugins: [router],
      },
    })
    router.push('/pomodoro')
    await router.isReady()
    expect(wrapper.html()).toContain('Pomodoro View')
  })
})
