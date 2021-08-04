export function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return route.meta.roles.some(s => roles.includes(s))
  }
  return true
}
