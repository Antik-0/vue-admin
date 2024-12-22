import type { RouteRecordRaw } from 'vue-router'
import AppLayout from '#/layout/AppLayout.vue'

import Demo from '#/views/demo/index.vue'

const routes: RouteRecordRaw[] = [
  {
    name: 'Dashboard',
    path: '/dashboard',
    component: AppLayout,
    meta: {
      icon: 'lucide:layout-dashboard',
      order: -1,
      title: '概览',
    },
    redirect: '/dashboard/analytics',
    children: [
      {
        name: 'Analytics',
        path: 'analytics',
        component: Demo,
        meta: {
          affixTab: true,
          icon: 'lucide:area-chart',
          title: '分析页',
        },
      },
      {
        name: 'Workspace',
        path: 'workspace',
        component: Demo,
        meta: {
          icon: 'carbon:workspace',
          title: '工作台',
        },
      },
    ],
  },
]

export default routes
