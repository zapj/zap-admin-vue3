import { createProdMockServer } from 'vite-plugin-mock/client'

// 导入所有模块
const modules = import.meta.glob('../mock/*.ts', { eager: true })

const mockModules: any[] = []
Object.keys(modules).forEach((key) => {
  if (key !== './mockProdServer.ts') {
    mockModules.push((modules[key] as any).default)
  }
})

export function setupProdMockServer() {
  createProdMockServer(mockModules)
}
