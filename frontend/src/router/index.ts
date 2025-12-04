import { createRouter, createWebHistory } from 'vue-router'
import RegisterForm from '@/RegisterForm.vue'
import LoginForm from '@/LoginForm.vue'
import UserLayout from '@/components/UserLayout.vue'
import Evaluatee from '@/views/Evaluatee/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/regis',
      name: 'RegisterForm',
      component: RegisterForm,
    },
    {
      path: '/login',
      name: 'LoginForm',
      component: LoginForm,
    },
    {
      path: '/Evaluatee',
      component: UserLayout,
      children:[
        {
          path: '/Evaluatee',
          name: 'Evaluatee',
          component: Evaluatee,
        },
      ]
    },
  ],
})

export default router
