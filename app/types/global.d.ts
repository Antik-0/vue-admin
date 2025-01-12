export {}

import type { RouteMetaRaw } from '@core/types'
import type { DefineComponent } from 'vue'

import 'vue-router'

declare module '*.vue' {
  const component: DefineComponent<any, any, any>
  export default component
}

declare module 'vue-router' {
  interface RouteMeta extends RouteMetaRaw {}
}

declare global {
  interface Window {
    helloWorld: string
  }
}
