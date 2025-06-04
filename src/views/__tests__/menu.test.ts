import { describe, it, expect, vi } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { usePermissionStore } from '@/stores/permission'
import { getMenuTree } from '@/api/menu'

// Mock the menu API
vi.mock('@/api/menu', () => ({
  getMenuTree: vi.fn(),
}))

describe('Permission Store with Dynamic Menu', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('should generate routes from backend menu', async () => {
    // Mock menu data
    const mockMenuTree = [
      {
        id: '1',
        parentId: '0',
        name: 'System',
        path: '/system',
        component: 'Layout',
        meta: {
          title: '系统管理',
          icon: 'setting',
          roles: ['admin'],
        },
        children: [
          {
            id: '2',
            parentId: '1',
            name: 'Menu',
            path: 'menu',
            component: 'system/menu/index',
            meta: {
              title: '菜单管理',
              icon: 'menu',
            },
            type: 'menu',
            status: 1,
            orderNum: 1,
          },
        ],
        type: 'dir',
        status: 1,
        orderNum: 1,
      },
    ]

    // Setup the mock
    ;(getMenuTree as any).mockResolvedValue(mockMenuTree)

    // Get the store instance
    const permissionStore = usePermissionStore()

    // Test admin role
    const adminRoutes = await permissionStore.generateRoutes(['admin'])
    expect(adminRoutes).toHaveLength(1)
    expect(adminRoutes[0].path).toBe('/system')
    expect(adminRoutes[0].children).toHaveLength(1)
    expect(adminRoutes[0].children?.[0].path).toBe('menu')

    // Test non-admin role
    const userRoutes = await permissionStore.generateRoutes(['user'])
    expect(userRoutes).toHaveLength(0) // Should be filtered out due to roles
  })

  it('should fallback to local routes when API fails', async () => {
    // Setup the mock to simulate API failure
    ;(getMenuTree as any).mockRejectedValue(new Error('API Error'))

    // Get the store instance
    const permissionStore = usePermissionStore()

    // Test fallback behavior
    const routes = await permissionStore.generateRoutes(['admin'])
    expect(routes).toBeDefined()
    expect(Array.isArray(routes)).toBe(true)
  })
})
