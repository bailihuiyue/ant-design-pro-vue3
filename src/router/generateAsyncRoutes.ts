import cloneDeep from 'lodash.clonedeep'
import i18n from '@/locales/useI18n'
import ls from '@/utils/Storage'
import { BasicLayout } from '@/layouts'//, BlankLayout, PageView, RouteView
import { getRoutePages } from '@/utils/batchImportFiles'
// 前端路由表
const constantRouterComponents: { [x: string]: Function } = {
  // 基础页面 layout 必须引入
  BasicLayout,
  // BlankLayout,
  // RouteView,
  // PageView,
  ...getRoutePages()
}

// 根级菜单
export const rootRouter: any = {
  key: '',
  name: 'index',
  path: '/',
  component: 'BasicLayout',
  redirect: '/dashboard',
  meta: {
    title: 'user.login.login'
  },
  children: []
}
// TODO:测试退出账号,换权限登录,左侧菜单变化时路由是否正常,是否能清空之前路由
const generateAsyncRoutes = (router, menu?: Array<unknown>) => {
  let menuNav: Array<unknown> = [];
  let childrenNav: Array<unknown> = [];
  // 后端数据, 根级树数组,  根级 PID
  const menuData = ls.get('MENU_NAV')
  if (!menuData && !menu) return
  // 若有缓存,则从缓存取菜单内容,然后直接生成路由
  if (menuData) {
    menuNav = menuData
  } else {
    listToTree(menu, childrenNav, 0);
    rootRouter.children = childrenNav;
    menuNav.push(rootRouter);
    ls.set('MENU_NAV', menuNav)
    console.log('MENU_NAV', menuNav);
  }
  const routers = generate(menuNav);
  // routers.push(notFoundRouter);
  // 当前addRoute方法只能add一个object,之前的算法返回的是包含一个object的数组,因此,取[0]
  router.addRoute(routers[0])
}
// TODO:2.icon无法识别
export const generate = (routerMap, parent?) => {
  return routerMap.map(item => {
    const { title, show, hideChildren, hiddenHeaderContent, target, icon } = item.meta || {}
    const currentRouter: any = {
      // 如果路由设置了 path，则作为默认 path，否则 路由地址 动态拼接生成如 /dashboard/workplace
      path: item.path || `${(parent && parent.path) || ''}/${item.key}`,
      // 路由名称，建议唯一
      name: item.name || item.key || '',
      // 该路由对应页面的 组件 :方案1                                      必须写一个存在的component,否则会报错
      // 一般情况下,每一级路由都会存在component
      component: constantRouterComponents[item.component || item.key] || constantRouterComponents['404'],
      // 该路由对应页面的 组件 :方案2 (动态加载)(vite 不支持)
      // component: (() => import(`@/views/${item.component}`)),
      // meta: 页面标题, 菜单图标, 页面权限(供指令权限用，可去掉)
      meta: {
        title: i18n.global.t(title),
        icon: icon || undefined,
        hiddenHeaderContent,
        target,
        permission: item.name,
      },
    }

    // 找不到页面文件并且不是外链
    if (!constantRouterComponents[item.component || item.key] && !item.path?.startsWith('http')) {
      console.warn('Can not find Component: ' + (item.component || item.key) + ' in path: ' + (item.path||item.key))
    }

    // 是否设置了隐藏菜单
    if (show === false) {
      currentRouter.hidden = true
    }
    // 是否设置了隐藏子菜单
    if (hideChildren) {
      currentRouter.hideChildrenInMenu = true
    }
    // 为了防止出现后端返回结果不规范，处理有可能出现拼接出两个 反斜杠
    if (!currentRouter.path.startsWith('http')) {
      currentRouter.path = currentRouter.path.replace('//', '/')
    }
    // 重定向
    item.redirect && (currentRouter.redirect = item.redirect)
    // 是否有子菜单，并递归处理
    if (item.children && item.children.length > 0) {
      // Recursion
      currentRouter.children = generate(item.children, currentRouter)
    }
    return currentRouter
  })
}

export const listToTree = (list, tree, parentId) => {
  list.forEach(item => {
    // 判断是否为父级菜单
    if (item.parentId === parentId) {
      const child = {
        ...item,
        key: item.key || item.name,
        children: []
      }
      // 迭代 list， 找到当前菜单相符合的所有子菜单
      listToTree(list, child.children, item.id)
      // 删掉不存在 children 值的属性
      if (child.children.length <= 0) {
        delete child.children
      }
      // 加入到树中
      tree.push(child)
    }
  })
}

export default generateAsyncRoutes

export function convertRoutes(nodes) {
  if (!nodes) return null

  nodes = cloneDeep(nodes)

  let queue = Array.isArray(nodes) ? nodes.concat() : [nodes]

  while (queue.length) {
    const levelSize = queue.length

    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift()

      if (!node.children || !node.children.length) continue

      node.children.forEach(child => {
        // 转化相对路径
        if (child.path[0] !== '/' && !child.path.startsWith('http')) {
          child.path = node.path.replace(/(\w*)[/]*$/, `$1/${child.path}`)
        }
      })

      queue = queue.concat(node.children)
    }
  }

  return nodes
}
