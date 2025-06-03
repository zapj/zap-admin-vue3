import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { RouteRecordRaw } from 'vue-router'
import { constantRoutes, asyncRoutes } from '@/router'
import { useUserStore } from './user'

/**
 * 使用meta.roles判断当前用户是否有权限
 * @param roles 用户角色列表
 * @param route 路由
 */
function hasPermission(roles: string[], route: RouteRecordRaw) {
  if (route.meta && route.meta.roles) {
    return roles.some((role) => (route.meta?.roles as string[]).includes(role))
  }
  return true
}

/**
 * 通过递归过滤异步路由表
 * @param routes 异步路由表
 * @param roles 用户角色列表
 */
function filterAsyncRoutes(routes: RouteRecordRaw[], roles: string[]) {
  const res: RouteRecordRaw[] = []

  routes.forEach((route) => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

export const usePermissionStore = defineStore('permission', () => {
  const routes = ref<RouteRecordRaw[]>([])
  const addRoutes = ref<RouteRecordRaw[]>([])
  const menus = ref<RouteRecordRaw[]>([])

  /**
   * 生成路由
   */
  function generateRoutes() {
    return new Promise<RouteRecordRaw[]>((resolve) => {
      const userStore = useUserStore()
      const { roles } = userStore

      let accessedRoutes
      // 如果是管理员，直接返回所有路由
      if (roles.includes('admin')) {
        accessedRoutes = asyncRoutes || []
      } else {
        // 根据角色过滤路由
        accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      }

      addRoutes.value = accessedRoutes
      routes.value = constantRoutes.concat(accessedRoutes)

      // 生成菜单
      generateMenus()

      resolve(accessedRoutes)
    })
  }

  /**
   * 生成菜单
   */
  function generateMenus() {
    // 过滤掉隐藏的路由
    const filterHiddenRoutes = (routes: RouteRecordRaw[]): RouteRecordRaw[] => {
      const res: RouteRecordRaw[] = []
      routes.forEach((route) => {
        if (!route.meta?.hidden) {
          if (route.children) {
            route.children = filterHiddenRoutes(route.children)
          }
          res.push(route)
        }
      })
      return res
    }

    // 过滤掉隐藏的路由后设置到菜单中
    menus.value = filterHiddenRoutes(routes.value)
  }

  return {
    routes,
    addRoutes,
    menus,
    generateRoutes,
    generateMenus,
  }
})
