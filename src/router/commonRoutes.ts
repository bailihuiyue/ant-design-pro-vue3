import { UserLayout } from '@/layouts'

export default [
  // {
  //   path: '/user',
  //   component: UserLayout,
  //   redirect: '/user/login',
  //   hidden: true,
  //   children: [
  //     {
  //       path: 'login',
  //       name: 'login',
  //       component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login.vue')
  //     },
  //     {
  //       path: 'register',
  //       name: 'register',
  //       component: () => import(/* webpackChunkName: "user" */ '@/views/user/Register')
  //     },
  //   ]
  // },
      {
        path: '/login',
        name: 'login',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login.vue')
      },
  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404.vue')
  }
]