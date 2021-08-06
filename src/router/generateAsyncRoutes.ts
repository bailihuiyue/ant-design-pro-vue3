import i18n from '@/locales/useI18n'
import ls from '@/utils/Storage'

// 前端路由表
const constantRouterComponents = {
  Home: import.meta.globEager('/src/views/Home.vue')
}

// 前端未找到页面路由（固定不用改）
export const notFoundRouter = {
  path: '*',
  redirect: '/404',
  hidden: true
}

// 根级菜单
export const rootRouter: any = {
  key: '',
  name: 'index',
  path: '',
  component: 'BasicLayout',
  redirect: '/dashboard',
  meta: {
    title: i18n.global.t('user.login.login')
  },
  children: []
}

export const generateAsyncRoutes = (menu?: Array<unknown>) => {
  const menuNav: Array<unknown> = [];
  const childrenNav: Array<unknown> = [];
  // 后端数据, 根级树数组,  根级 PID
  const menuData = ls.get('menu')
  // 若有缓存,则从缓存取菜单内容
  menuData ? childrenNav.push(menuData) : listToTree(menu, childrenNav, 0);
  rootRouter.children = childrenNav;
  menuNav.push(rootRouter);
  ls.set('menuNav', menuNav)
  console.log('menuNav', menuNav);
  const routers = generate(menuNav);
  routers.push(notFoundRouter);
  console.log('routers', routers);
}

export const generate = (routerMap, parent?) => {
  return routerMap.map(item => {
    const { title, show, hideChildren, hiddenHeaderContent, target, icon } = item.meta || {}
    const currentRouter = {
      // 如果路由设置了 path，则作为默认 path，否则 路由地址 动态拼接生成如 /dashboard/workplace
      path: item.path || `${(parent && parent.path) || ''}/${item.key}`,
      // 路由名称，建议唯一
      name: item.name || item.key || '',
      // 该路由对应页面的 组件 :方案1
      component: constantRouterComponents[item.component || item.key],
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

      hidden: false,
      hideChildrenInMenu: false,
      redirect: '',
      children: []
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
