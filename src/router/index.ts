import { createRouter, type RouteRecordRaw, createWebHashHistory } from 'vue-router'
// import Dashboard from '@/views/Dashboard.vue'
import Dashboard from '@/views/Dashboard.vue'

const routes:RouteRecordRaw[] = [
  {
    path: '/',
    component: Dashboard,
  },
  {
    path: '/clock',
    component: () => import('@/views/Clock/index.vue'),
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
