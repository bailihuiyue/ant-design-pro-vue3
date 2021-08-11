import config from '@/config/defaultSettings';
import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';
import { setupBeforeEach, setupAfterEach } from './routerGuard'
import generateAsyncRoutes from './generateAsyncRoutes'
import routes from './commonRoutes'

const router = createRouter({
  history: createWebHistory(),
  routes: routes as unknown as RouteRecordRaw[],
});

// 路由守卫,鉴权
setupBeforeEach(router)

setupAfterEach(router)

if (config.useAsyncRouter) {
  // 初次路由login时获取,然后存在ls,之后刷新页面时从本地获取,直接在初始化路由时就添加
  generateAsyncRoutes(router)
}

export default router;
