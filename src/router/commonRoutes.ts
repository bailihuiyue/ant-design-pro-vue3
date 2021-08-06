import { UserLayout } from '@/layouts'
import { Router } from './types'

export default [
  {
    path: '/user',
    component: UserLayout,
    redirect: '/user/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login.vue'),
        meta: { title:'user.login.signup'}
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
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404.vue')
  }
] as Router[]
