import { defineStore } from 'pinia'
import type { ActivityType } from 'types/activityTypes'

export const useActivityStore = defineStore('activity', {
  state: () => ({
    activities: <Array<ActivityType>>[],
  }),

  actions: {
    addActivity(activity: ActivityType) {
      this.activities.push(activity)
    },
  },
})
