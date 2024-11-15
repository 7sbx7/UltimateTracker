import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../components/pages/HomeView.vue'
import PomodoroView from '@/components/pages/PomodoroView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/pomodoro',
      name: 'pomodoro',
      component: PomodoroView,
    },
  ],
})

export default router
