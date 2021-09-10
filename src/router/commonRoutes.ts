import { UserLayout } from '@/layouts'
import { Router } from './types'
import { example } from './exampleRouterMap'

// info:todo:1.如果使用服务端获取路由,path: '/',这块路由再写就会被覆盖
// 2.router.addRoute(parent, routeObj),添加parent,它就会自动加上/parent/xxx,直接写parent即可,就算嵌套多层也没事,自动变成/xxxx/xxxx/parent/xxxxx
// 3.以“/”开头的嵌套路径会被当作根路径，所以子路由上不用加“/”;
// 在生成路由时，主路由上的path会被自动添加到子路由之前，所以子路由上的path不用在重新声明主路由上的path了。
export default [
  // 示例用路由,可删
  example,
  {
    path: '/user',
    name: 'user',
    component: UserLayout,
    redirect: '/user/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login.vue'),
        meta: { title: 'user.login.signup' }
      },
      {
        path: 'register',
        name: 'register',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Register.vue')
      },
      {
        path: 'registerResult',
        name: 'registerResult',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/RegisterResult.vue')
      },
      {
        path: 'recover',
        name: 'recover',
        component: undefined
      },
    ]
  },
  {
    path: '/:path(.*)',
    name: 'NoMatch',
    component: () => import('@/views/exception/404.vue'),
  }
] as Router[]
