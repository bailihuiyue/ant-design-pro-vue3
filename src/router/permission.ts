export function hasPermission(permission, route) {
  if (route.meta && route.meta.permission) {
    return route.meta.permission.some(s => permission.includes(s))
  }
  return true
}


// 单账户多角色时，使用该方法可过滤角色不存在的菜单
// 暂时没用
export function hasRole(permission, route) {
  if (route.meta && route.meta.permission) {
    return route.meta.permission.includes(permission.id)
  } else {
    return true
  }
}

export function filteRouterPermission(routerMap, permission) {
  const accessedRouters = routerMap.filter(route => {
    if (hasPermission(permission, route)) {
      if (route.children && route.children.length) {
        route.children = filteRouterPermission(route.children, permission)
      }
      return true
    }
    return false
  })
  return accessedRouters
}
