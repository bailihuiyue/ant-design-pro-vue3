import { BasicLayout, RouteView } from '@/layouts'
import { Router } from './types'

export const example: Router = {
  path: '/',
  name: 'index',
  component: BasicLayout,
  meta: { title: 'menu.home' },
  redirect: '/dashboard',
  children: [
    // dashboard
    {
      path: '/dashboard',
      name: 'dashboard',
      redirect: '/dashboard/analysis',
      component: RouteView,
      meta: { title: 'menu.dashboard.title', icon: 'bx-analyse', keepAlive: true, permission: ['admin'] },
      children: [
        {
          path: 'analysis/:pageNo([1-9]\\d*)?',
          name: 'Analysis',
          component: () => import('@/views/dashboard/Workplace.vue'),
          meta: { title: 'menu.dashboard.analysis', keepAlive: false, permission: ['admin'], hidden: false }
        },
        // 外部链接
        {
          path: 'monitor',
          name: 'Monitor',
          meta: { title: 'menu.dashboard.monitor', target: 'http://www.baidu.com', permission: ['admin'], blank: true }
        },
        {
          path: 'workplace',
          name: 'Workplace',
          component: () => import('@/views/Home.vue'),
          meta: { title: 'menu.dashboard.workplace', keepAlive: true, permission: ['admin'] }
        }
      ]
    },
    // account
    {
      path: '/account',
      component: RouteView,
      redirect: '/account/center',
      name: 'account',
      meta: { title: 'menu.account.title', icon: 'bx-analyse', keepAlive: true },
      children: [
        {
          path: '/account/center',
          name: 'center',
          component: () => import('@/views/account/index.vue'),
          meta: { title: 'menu.account.center', keepAlive: true }
        },
        {
          path: '/account/settings',
          name: 'settings',
          component: () => import('@/views/Home.vue'),
          meta: { title: 'menu.account.settings', hideHeader: true },
          redirect: '/account/settings/basic',
          hideChildrenInMenu: true,
          children: [
            {
              path: '/account/settings/basic',
              name: 'BasicSettings',
              component: () => import('@/views/Home.vue'),
              meta: { title: 'menu.account.settings', hidden: true }
            },
            {
              path: '/account/settings/security',
              name: 'SecuritySettings',
              component: () => import('@/views/Home.vue'),
              meta: {
                title: 'account.settings.menuMap.security',
                hidden: true,
                keepAlive: true,
                permission: ['user']
              }
            },
            {
              path: '/account/settings/custom',
              name: 'CustomSettings',
              component: () => import('@/views/Home.vue'),
              meta: { title: 'account.settings.menuMap.custom', hidden: true, keepAlive: true }
            },
            {
              path: '/account/settings/binding',
              name: 'BindingSettings',
              component: () => import('@/views/Home.vue'),
              meta: { title: 'account.settings.menuMap.binding', hidden: true, keepAlive: true }
            },
            {
              path: '/account/settings/notification',
              name: 'NotificationSettings',
              component: () => import('@/views/Home.vue'),
              meta: {
                title: 'account.settings.menuMap.notification',
                hidden: true,
                keepAlive: true,
                permission: ['user']
              }
            }
          ]
        }
      ]
    },
    // forms
    {
      path: '/form',
      name: 'form',
      redirect: '/form/base-form',
      component: RouteView,
      meta: { title: 'menu.form.title', icon: 'bx-analyse', permission: ['user'] },
      children: [
        {
          path: '/form/base-form',
          name: 'BaseForm',
          component: () => import('@/views/Home.vue'),
          meta: { title: 'menu.form.basic-form', keepAlive: true }
        },
        {
          path: '/form/step-form',
          name: 'StepForm',
          component: () => import('@/views/Home.vue'),
          meta: { title: 'menu.form.step-form.title', keepAlive: true }
        },
        {
          path: '/form/advanced-form',
          name: 'AdvanceForm',
          component: () => import('@/views/Home.vue'),
          meta: { title: 'menu.form.advanced-form', keepAlive: true }
        }
      ]
    },

    // list
    {
      path: '/list',
      name: 'list',
      component: RouteView,
      redirect: '/list/table-list',
      meta: { title: 'menu.list.title', icon: 'bx-analyse', permission: ['table'] },
      children: [
        {
          path: '/list/table-list/:pageNo([1-9]\\d*)?',
          name: 'TableListWrapper',
          hideChildrenInMenu: true, // 强制显示 MenuItem 而不是 SubMenu
          component: () => import('@/views/Home.vue'),
          meta: { title: 'menu.list.table-list', keepAlive: true }
        },
        {
          path: '/list/basic-list',
          name: 'BasicList',
          component: () => import('@/views/Home.vue'),
          meta: { title: 'menu.list.basic-list', keepAlive: true }
        },
        {
          path: '/list/card',
          name: 'CardList',
          component: () => import('@/views/Home.vue'),
          meta: { title: 'menu.list.card-list', keepAlive: true }
        },
        {
          path: '/list/search',
          name: 'SearchList',
          component: () => import('@/views/Home.vue'),
          redirect: '/list/search/article',
          meta: { title: 'menu.list.search-list.title', keepAlive: true },
          children: [
            {
              path: '/list/search/article',
              name: 'SearchArticles',
              component: () => import('@/views/Home.vue'),
              meta: { title: 'menu.list.search-list.articles' }
            },
            {
              path: '/list/search/project',
              name: 'SearchProjects',
              component: () => import('@/views/Home.vue'),
              meta: { title: 'menu.list.search-list.projects' }
            },
            {
              path: '/list/search/application',
              name: 'SearchApplications',
              component: () => import('@/views/Home.vue'),
              meta: { title: 'menu.list.search-list.applications' }
            }
          ]
        }
      ]
    },

    // profile
    {
      path: '/profile',
      name: 'profile',
      component: RouteView,
      redirect: '/profile/basic',
      meta: { title: 'menu.profile.title', icon: 'bx-analyse' },
      children: [
        {
          path: '/profile/basic',
          name: 'ProfileBasic',
          component: () => import('@/views/Home.vue'),
          meta: { title: 'menu.profile.basic' }
        },
        {
          path: '/profile/advanced',
          name: 'ProfileAdvanced',
          component: () => import('@/views/Home.vue'),
          meta: { title: 'menu.profile.advanced' }
        }
      ]
    },

    // result
    {
      path: '/result',
      name: 'result',
      component: RouteView,
      redirect: '/result/success',
      meta: { title: 'menu.result.title', icon: 'bx-analyse' },
      children: [
        {
          path: '/result/success',
          name: 'ResultSuccess',
          component: () => import(/* webpackChunkName: "result" */ '@/views/Home.vue'),
          meta: { title: 'menu.result.success', keepAlive: false, hiddenHeaderContent: true }
        },
        {
          path: '/result/fail',
          name: 'ResultFail',
          component: () => import(/* webpackChunkName: "result" */ '@/views/Home.vue'),
          meta: { title: 'menu.result.fail', keepAlive: false, hiddenHeaderContent: true }
        }
      ]
    },

    // exception
    {
      path: '/exception',
      name: 'exception',
      component: RouteView,
      redirect: '/exception/403',
      meta: { title: 'menu.exception.title', icon: 'bx-analyse' },
      children: [
        {
          path: '/exception/403',
          name: '403',
          component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/403.vue'),
          meta: { title: 'menu.exception.not-permission' }
        },
        {
          path: '/exception/404',
          name: '404',
          component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404.vue'),
          meta: { title: 'menu.exception.not-find' }
        },
        {
          path: '/exception/500',
          name: '500',
          component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/500.vue'),
          meta: { title: 'menu.exception.server-error' }
        }
      ]
    },
    {
      path: '/dynamicForm',
      name: 'dynamicForm',
      component: () => import('@/views/dynamicForm/index.vue'),
      meta: { title: 'menu.dynamicForm', icon: 'bx-analyse' }
    },
    {
      path: '/logicflow',
      name: 'logicflow',
      component: () => import('@/views/logicflow/index.vue'),
      meta: { title: 'menu.logicflow', icon: 'bx-analyse' }
    },
    {
        path: '/makeChart',
        name: 'makeChart',
        component: () => import('@/views/makeChart/index.vue'),
        meta: { title: 'menu.makeChart', icon: 'bx-analyse' }
    },
    // other
    /*
    {
      path: '/other',
      name: 'otherPage',
      component: PageView,
      meta: { title: '其他组件', icon: 'slack', permission: [ 'dashboard' ] },
      redirect: '/other/icon-selector',
      children: [
        {
          path: '/other/icon-selector',
          name: 'TestIconSelect',
          component: () => import('@/views/other/IconSelectorView'),
          meta: { title: 'IconSelector', icon: 'tool', keepAlive: true, permission: [ 'dashboard' ] }
        },
        {
          path: '/other/list',
          component: RouteView,
          meta: { title: '业务布局', icon: 'layout', permission: [ 'support' ] },
          redirect: '/other/list/tree-list',
          children: [
            {
              path: '/other/list/tree-list',
              name: 'TreeList',
              component: () => import('@/views/other/TreeList'),
              meta: { title: '树目录表格', keepAlive: true }
            },
            {
              path: '/other/list/edit-table',
              name: 'EditList',
              component: () => import('@/views/other/TableInnerEditList'),
              meta: { title: '内联编辑表格', keepAlive: true }
            },
            {
              path: '/other/list/user-list',
              name: 'UserList',
              component: () => import('@/views/other/UserList'),
              meta: { title: '用户列表', keepAlive: true }
            },
            {
              path: '/other/list/role-list',
              name: 'RoleList',
              component: () => import('@/views/other/RoleList'),
              meta: { title: '角色列表', keepAlive: true }
            },
            {
              path: '/other/list/system-role',
              name: 'SystemRole',
              component: () => import('@/views/role/RoleList'),
              meta: { title: '角色列表2', keepAlive: true }
            },
            {
              path: '/other/list/permission-list',
              name: 'PermissionList',
              component: () => import('@/views/other/PermissionList'),
              meta: { title: '权限列表', keepAlive: true }
            }
          ]
        }
      ]
    }
    */
  ]
}
