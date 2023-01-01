import { createRouter, createWebHistory } from 'vue-router'
import Index from '../views/Index.vue';
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index,
    },
    {
      path: '/test',
      name: 'test',
      component: () => import('../views/Test.vue'),
    },
    {
      path: '/blog/:id',
      name: 'blog',
      component: () => import(/*webpackChunkName: 'blog'*/'../views/Blog.vue'),
      children: [],
    },
    {
      path: '/undefined',
      redirect: '/'
    }
  ],
  scrollBehavior(to, from, savePosition){
    console.log("to:", to);
    console.log("from:", from);
    console.log("position:",savePosition);
    if (to.hash) {
      return {
        selector: to.hash,
        offset: {
          y: 100
        },
        behavior: 'smooth'
      }
    }
  }
})
export default router
