import { createRouter, createWebHistory } from 'vue-router'
import RegisterForm from '@/RegisterForm.vue'
import LoginForm from '@/LoginForm.vue'
import UserLayout from '@/components/UserLayout.vue'
import Evaluatee from '@/views/Evaluatee/index.vue'
import Edit_eva from '@/views/Evaluatee/Edit_eva.vue'
import Selfeva from '@/views/Evaluatee/Selfeva.vue'
import Check_score from '@/views/Evaluatee/Check_score.vue'
import Score_eva from '@/views/Evaluatee/Score_eva.vue'
import Committee from '@/views/Committee/index.vue'
import Detail_eva from '@/views/Committee/Detail_eva.vue'

// Staff
import index from '@/views/Staff/index.vue'
import ManageEva from '@/views/Staff/ManageEva.vue'
import ManageCommit from '@/views/Staff/ManageCommit.vue'
import Topic from '@/views/Staff/Topic.vue'
import Indicate from '@/views/Staff/Indicate.vue'
import Round_eva from '@/views/Staff/Round_eva.vue'
import Eva from '@/views/Staff/Eva.vue'
import Eva_commit from '@/views/Staff/Eva_commit.vue'
import Score_evaList from '@/views/Staff/Score_evaList.vue'
import Score_commitList from '@/views/Staff/Score_commitList.vue'
import StatusEva from '@/views/Staff/StatusEva.vue'
import StatusCommit from '@/views/Staff/StatusCommit.vue'
import Status2 from '@/views/Staff/Status2.vue'
import Document from '@/views/Staff/Document.vue'
import ScoreEva from '@/views/Staff/ScoreEva.vue'

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
      path: '/',
      redirect: 'login',
    },
    {
      path: '/Committee',
      component: UserLayout,
      children:[
        {
          path: '/Committee',
          name: 'Committee',
          component: Committee,
        },
        {
          path: '/Detail_eva/:id_eva',
          name: 'Detail_eva',
          component: Detail_eva,
        },
      ]
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
        {
          path: '/Edit_eva',
          name: 'Edit_eva',
          component: Edit_eva,
        },
        {
          path: '/Selfeva',
          name: 'Selfeva',
          component: Selfeva,
        },
        {
          path: '/Check_score',
          name: 'Check_score',
          component: Check_score,
        },
        {
          path: '/Score_eva',
          name: 'Score_eva',
          component: Score_eva,
        },
      ]
    },
    // Staff+===========================
    {
      path: '/Staff',
      component: UserLayout,
      children:[
        {
          path: '/Staff',
          name: 'Staff',
          component: index,
        },
        {
          path: '/ManageEva',
          name: 'ManageEva',
          component: ManageEva,
        },
        {
          path: '/ManageCommit',
          name: 'ManageCommit',
          component: ManageCommit,
        },
        {
          path: '/Topic',
          name: 'Topic',
          component: Topic,
        },
        {
          path: '/Indicate',
          name: 'Indicate',
          component: Indicate,
        },
        {
          path: '/Round_eva',
          name: 'Round_eva',
          component: Round_eva,
        },
        {
          path: '/Eva',
          name: 'Eva',
          component: Eva,
        },
        {
          path: '/Eva_commit/:id_eva',
          name: 'Eva_commit',
          component: Eva_commit,
        },
        {
          path: '/Score_evaList',
          name: 'Score_evaList',
          component: Score_evaList,
        },
        {
          path: '/Score_commitList',
          name: 'Score_commitList',
          component: Score_commitList,
        },
        {
          path: '/StatusEva',
          name: 'StatusEva',
          component: StatusEva,
        },
        {
          path: '/StatusCommit',
          name: 'StatusCommit',
          component: StatusCommit,
        },
        {
          path: '/Status2/:id_eva',
          name: 'Status2',
          component: Status2,
        },
        {
          path: '/Document',
          name: 'Document',
          component: Document,
        },
        {
          path: '/ScoreEva/:id_eva',
          name: 'ScoreEva',
          component: ScoreEva,
        },
      ]
    },
  ],
})

export default router
