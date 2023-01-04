import { createRouter, createWebHistory } from 'vue-router'
import Index from '../views/Index.vue';
import Login from '../views/Login.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/',
      name: 'index',
      component: Index,
    },
    {
      path: '/blog/:id',
      name: 'blog',
      component: () => import(/* webpackChunkName: 'blog' */'../views/Blog.vue'),
      children: [],
    },
    {
      path: '/test',
      name: 'test',
      component: () => import('../views/Test.vue'),
    },
    {
      path: '/404',
      component: ()=> import('../views/404.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/404'
    }
  ],
  // scrollBehavior(to, from, savePosition){
  //   console.log("to:", to);
  //   console.log("from:", from);
  //   console.log("position:",savePosition);
  //   if (to.hash) {
  //     return {
  //       selector: to.hash,
  //       offset: {
  //         y: 100
  //       },
  //       behavior: 'smooth'
  //     }
  //   }
  // }
})
export default router
