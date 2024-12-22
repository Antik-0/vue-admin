import type { App } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

import { coreRoutes, fallbackNotFoundRoute } from './core.ts'
import dashboard from './modules/dashboard.ts'
import demos from './modules/demo.ts'
import logos from './modules/logos.ts'

const viewRoutes = [...dashboard, ...logos, ...demos]

const router = createRouter({
  history: createWebHistory(),
  routes: [...coreRoutes, ...viewRoutes, fallbackNotFoundRoute],
  scrollBehavior: (to, _from, savedPosition) => {
    if (savedPosition) {
      return savedPosition
    }
    return to.hash ? { behavior: 'smooth', el: to.hash } : { left: 0, top: 0 }
  },
})

function setupRouter(app: App<Element>) {
  app.use(router)
}

export { setupRouter }
