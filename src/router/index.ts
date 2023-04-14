import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/view/home/Home.vue')
  },
  {
    path: '/recipes',
    name: 'Recipes',
    component: () => import('../view/recipes/Recipes.vue')
  },
  // {
  //   path: '/commonArea',
  //   name: 'CommonArea',
  //   meta:{
  //     hideLink:true
  //   },
  //   component: () => import('@/view/commonArea/CommonArea.vue') 
  // },
  // {
  //   path: '/extract',
  //   name: 'Extract',
  //   component: () => import('../view/extract/Extract.vue')
  // }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
