import config from '@/config/defaultSettings';
import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';
import commonRoutes from '@/router/commonRoutes'
import { Router } from './types'
import { setupBeforeEach, setupAfterEach } from './routerGuard'
import generateAsyncRoutes from './generateAsyncRoutes'

const routes: Router[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    meta: { title: 'user.login.login' }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About'),
  },
  commonRoutes,
  {
    path: '/:path(.*)',
    name: 'NoMatch',
    component: () => import('@/views/exception/404.vue'),
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes as any as RouteRecordRaw[],
});

// 路由守卫,鉴权
setupBeforeEach(router)

setupAfterEach(router)

if (config.useAsyncRouter) {
  // 初次路由login时获取,然后存在ls,之后刷新页面时从本地获取,直接在初始化路由时就添加
  generateAsyncRoutes(router)
}

export default router;
