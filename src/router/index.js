import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'home',
      component: () => import('../views/Home.vue')
    },
    {
      path: '/history',
      name: 'history',
      component: () => import('../views/History.vue')
    },
    {
      path: '/others',
      name: '/others',
      component: () => import('../views/Others.vue')
    },
    {
      path: '/',
      name: '/',
      component: () => import('../components/Login.vue')
    }
  ]
})

export default router
