import NProgress from 'nprogress' // progress bar
import '@/components/NProgress/nprogress.less' // progress bar custom style
import { ACCESS_TOKEN, PERMISSION } from '@/store/mutation-types'
import { hasPermission } from './permission'
import ls from '@/utils/Storage'
import { setDocumentTitle } from '@/utils/domUtil'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['login', 'register', 'registerResult'] // 不进行拦截的路由名称集合
const defaultRoutePath = '/dashboard/workplace'

export const beforeEach = (to, from, next) => {
  NProgress.start() // 加载进度条
  setDocumentTitle(to)
  if (ls.get(ACCESS_TOKEN) && ls.get(PERMISSION)) {
    /* has token */
    if (to.path === '/user/login') {
      next({ path: defaultRoutePath })
      NProgress.done()
    } else {
      const roles = ls.get(PERMISSION)
      const canAccess = hasPermission(roles, to)
      if (canAccess) {
        next()
      } else {
        next({ path: '/exception/403' })
      }
    }
  } else {
    if (whiteList.includes(to.name)) {
      // 在免登录白名单，直接进入
      next()
    } else {
      next({ path: '/user/login', query: { redirect: to.fullPath } })
      NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
    }
  }
}

export const afterEach = () => {
  NProgress.done() // finish progress bar
}
