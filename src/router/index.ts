import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';
import commonRoutes from '@/router/commonRoutes'
import { Router } from './types'
import { beforeEach, afterEach } from './routerGuard'

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
  ...commonRoutes,
  {
    path: '/:path(.*)',
    name: 'NoMatch',
    component: () => import('@/views/exception/404.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes as any as RouteRecordRaw[],
});

router.beforeEach(beforeEach)
router.afterEach(afterEach)

export default router;
