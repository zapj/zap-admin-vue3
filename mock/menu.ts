import type { MockMethod } from 'vite-plugin-mock'

// 模拟菜单数据
const menus = [
  {
    id: 1,
    name: 'dashboard',
    path: '/dashboard',
    component: 'Layout',
    redirect: '/dashboard/analysis',
    meta: {
      title: '仪表盘',
      icon: 'dashboard',
      order: 1,
    },
    children: [
      {
        id: 11,
        name: 'analysis',
        path: 'analysis',
        component: 'dashboard/analysis/index',
        meta: {
          title: '分析页',
          icon: 'chart',
          order: 1,
        },
      },
      {
        id: 12,
        name: 'workplace',
        path: 'workplace',
        component: 'dashboard/workplace/index',
        meta: {
          title: '工作台',
          icon: 'desktop',
          order: 2,
        },
      },
    ],
  },
  {
    id: 2,
    name: 'system',
    path: '/system',
    component: 'Layout',
    redirect: '/system/user',
    meta: {
      title: '系统管理',
      icon: 'setting',
      order: 2,
    },
    children: [
      {
        id: 21,
        name: 'user',
        path: 'user',
        component: 'system/user/index',
        meta: {
          title: '用户管理',
          icon: 'user',
          order: 1,
        },
      },
      {
        id: 22,
        name: 'role',
        path: 'role',
        component: 'system/role/index',
        meta: {
          title: '角色管理',
          icon: 'usergroup',
          order: 2,
        },
      },
      {
        id: 23,
        name: 'menu',
        path: 'menu',
        component: 'system/menu/index',
        meta: {
          title: '菜单管理',
          icon: 'menu',
          order: 3,
        },
      },
    ],
  },
  {
    id: 3,
    name: 'content',
    path: '/content',
    component: 'Layout',
    redirect: '/content/article',
    meta: {
      title: '内容管理',
      icon: 'file',
      order: 3,
    },
    children: [
      {
        id: 31,
        name: 'article',
        path: 'article',
        component: 'content/article/index',
        meta: {
          title: '文章管理',
          icon: 'file-text',
          order: 1,
        },
      },
      {
        id: 32,
        name: 'category',
        path: 'category',
        component: 'content/category/index',
        meta: {
          title: '分类管理',
          icon: 'folder',
          order: 2,
        },
      },
      {
        id: 33,
        name: 'tag',
        path: 'tag',
        component: 'content/tag/index',
        meta: {
          title: '标签管理',
          icon: 'tag',
          order: 3,
        },
      },
    ],
  },
]

// 模拟接口
export default [
  // 获取菜单列表
  {
    url: '/api/menus',
    method: 'get',
    response: () => {
      return {
        code: 200,
        data: menus,
        message: '获取菜单列表成功',
      }
    },
  },

  // 根据角色获取菜单
  {
    url: '/api/menus/role',
    method: 'get',
    response: ({ query }) => {
      const { role } = query

      let accessibleMenus = []

      if (role === 'admin') {
        // 管理员可以访问所有菜单
        accessibleMenus = menus
      } else if (role === 'editor') {
        // 编辑可以访问仪表盘和内容管理
        accessibleMenus = menus.filter(
          (menu) => menu.name === 'dashboard' || menu.name === 'content',
        )
      } else {
        // 普通用户只能访问仪表盘
        accessibleMenus = menus.filter((menu) => menu.name === 'dashboard')
      }

      return {
        code: 200,
        data: accessibleMenus,
        message: '获取角色菜单成功',
      }
    },
  },
] as MockMethod[]
