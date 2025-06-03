import { createProdMockServer } from 'vite-plugin-mock/client'

// 导入所有模块
const modules: Record<string, any> = import.meta.glob('../mock/*.ts', { eager: true })

const mockFiles = Object.values(modules).filter(
  (module) => module.default && typeof module.default === 'function',
)

export function setupProdMockServer() {
  createProdMockServer(mockFiles)
}
