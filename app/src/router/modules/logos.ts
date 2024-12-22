import type { RouteRecordRaw } from 'vue-router'
import AppLayout from '#/layout/AppLayout.vue'

import Demo from '#/views/demo/index.vue'

const routes: RouteRecordRaw[] = [
  {
    name: 'logos',
    path: '/logos',
    component: AppLayout,
    meta: {
      icon: 'fa:android',
      title: '技术栈',
    },
    children: [
      {
        name: 'vue',
        path: '/logos/vue',
        component: Demo,
        meta: {
          icon: 'logos:vue',
          link: 'https://router.vuejs.org/zh/guide/essentials/named-routes.html',
          title: 'vue',
        },
      },
      {
        name: 'react',
        path: '/logos/react',
        component: Demo,
        meta: {
          icon: 'logos:react',
          link: 'https://router.vuejs.org/zh/guide/essentials/named-routes.html',
          title: 'vue',
        },
      },
      {
        name: 'vite',
        path: '/logos/vite',
        component: Demo,
        meta: {
          icon: 'logos:vitejs',
          link: 'https://router.vuejs.org/zh/guide/essentials/named-routes.html',
          title: 'vite',
        },
      },
    ],
  },
]

export default routes
