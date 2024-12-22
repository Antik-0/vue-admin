import type { RouteRecordRaw } from 'vue-router'

import Demo from '#/views/demo/index.vue'

/** 全局404页面 */
const fallbackNotFoundRoute: RouteRecordRaw = {
  name: 'FallbackNotFound',
  path: '/:path(.*)*',
  component: Demo,
  meta: {
    hideInBreadcrumb: true,
    hideInMenu: true,
    hideInTab: true,
    title: '404',
  },
}

/** 基本路由，这些路由是必须存在的 */
const coreRoutes: RouteRecordRaw[] = [
  {
    name: 'root',
    path: '/',
    meta: {
      hideInMenu: true,
      title: 'Root',
    },
    redirect: '/dashboard',
  },
]

export { coreRoutes, fallbackNotFoundRoute }
