import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Dashboard',
    component: () => import('../pages/Dashboard/index.vue'),
    meta: { title: '我的简历 · 简站' },
  },
  {
    path: '/editor/:id?',
    name: 'Editor',
    component: () => import('../pages/Editor/index.vue'),
    meta: { title: '编辑简历 · 简站' },
  },
  {
    path: '/preview/:id',
    name: 'Preview',
    component: () => import('../pages/Preview/index.vue'),
    meta: { title: '预览简历 · 简站' },
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

const BASE_TITLE = '简站 · 简历生成器'

router.afterEach((to) => {
  const title = to.meta.title as string | undefined
  document.title = title || BASE_TITLE
})

export default router
