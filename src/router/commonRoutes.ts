import { UserLayout } from '@/layouts'

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
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login.vue')
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
  // {
  //   path: '/register',
  //   name: 'register',
  //   component: () => import(/* webpackChunkName: "user" */ '@/views/user/Register.vue')
  // },
  // {
  //   path: '/login',
  //   name: 'login',
  //   component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login.vue')
  // },
  // {
  //   path: '/recover',
  //   name: 'recover',
  //   component: undefined
  // },
  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404.vue')
  }
]
