export function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return route.meta.roles.some(s => roles.includes(s))
  }
  return true
}

/**
 * 单账户多角色时，使用该方法可过滤角色不存在的菜单
 *
 * @param roles
 * @param route
 * @returns {*}
 */
// eslint-disable-next-line
export function hasRole(roles, route) {
  if (route.meta && route.meta.roles) {
    return route.meta.roles.includes(roles.id)
  } else {
    return true
  }
}

export function filteRouterPermission(routerMap, roles) {
  const accessedRouters = routerMap.filter(route => {
    if (hasPermission(roles, route)) {
      if (route.children && route.children.length) {
        route.children = filteRouterPermission(route.children, roles)
      }
      return true
    }
    return false
  })
  return accessedRouters
}
