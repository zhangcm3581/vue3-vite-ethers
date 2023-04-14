/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module '*.json' {
  import type { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare interface Window {
  ethereum: any,
  web3: any
}


interface ImportMetaEnv extends Readonly<Record<string, string>> {
  readonly VITE_WEB3_PROVIDER: string,
  readonly VITE_WEB3_CHAIN_ID: string
  readonly VITE_WEB3_CHAIN_CONFIG: string
  readonly VITE_BASE_URL: string
  // 更多环境变量...
}
interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare interface web3Result<T> {
  success: boolean,
  result: T
}

