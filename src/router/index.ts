import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('../pages/Home/index.vue'),
    },
    {
      path: '/notFound',
      name: 'NotFound',
      component: () => import('../pages/NotFound.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/notFound',
    },
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
