import { App } from 'vue';
import { createRouter, createWebHistory } from "vue-router"
import permission from './permission';
import DefaultLayout from '../layouts/DefaultLayout.vue'
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/demo',
      name: 'demo',
      component: () => import('../views/demo.vue'),
      meta: {
        keepAlive: false,
        layout: DefaultLayout 
      }
    },
    // 以上範例用
    // 首頁
    {
      path: '/',
      name: 'home',
      component: () => import('../views/home/index.vue'),
      meta: {
        keepAlive: false,
        layout: DefaultLayout 
      }
    },
    // 錯誤頁面
    {
      path: '/error',
      name: 'error',
      component: () => import('../views/error.vue'),
      meta: {
        keepAlive: false,
      }
    },
  ],
})

export function setupRouter(AppInstance:App<Element>) {
  permission(router);
  AppInstance.use(router);
}

export default router