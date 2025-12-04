import { createRouter, createWebHistory } from 'vue-router'
import LoginForm from '@/LoginForm.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'LoginForm',
      component: LoginForm,
    },
  ],
})

export default router
