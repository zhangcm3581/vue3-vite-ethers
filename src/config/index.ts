// config/index.ts
export interface IConfig {
}

interface env {
  [key: string]: any
}

const envMap:env= {}
const globalModules = import.meta.globEager('./*.ts')
Object.entries(globalModules).forEach(([key, value]) => {
  // key.match(/\.\/env\.(\S*)\.ts/)
  const name = key.replace(/\.\/env\.(.*)\.ts$/, '$1')
  envMap[name] = value
})

// 根据环境引入不同配置

export const config = envMap[import.meta.env.MODE].default
// console.log('根据环境引入不同配置', config)