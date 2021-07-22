import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';
import commonRoutes from '@/router/commonRoutes'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About'),
  },
  ...commonRoutes,
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
