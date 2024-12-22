export {}

import type { RouteMeta as _RouterMeta } from '@core/types'
import type { DefineComponent } from 'vue'

import 'vue-router'

declare module '*.vue' {
  const component: DefineComponent<any, any, any>
  export default component
}

declare module 'vue-router' {
  interface RouteMeta extends _RouterMeta {}
}

declare global {
  interface Window {
    helloWorld: string
  }
}
