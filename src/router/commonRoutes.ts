import { UserLayout } from '@/layouts'
import { Router } from './types'

export default [
  {
    path: '/',
    name: 'Home',
    redirect: '/test',
    component: () => import('../layouts/BasicLayout.vue'),
    children: [{
      name: 'test',
      path: 'test',
      meta: { title: 'user.login.login' },
      component: () => import('../views/Home.vue'),
    }
    ],
    // component: () => import('../views/Home.vue'),
    meta: { title: 'user.login.login' }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About'),
  },
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
