import type { RouteRecordRaw } from 'vue-router'
import AppLayout from '#/layout/AppLayout.vue'

import Demo from '#/views/demo/index.vue'

const routes: RouteRecordRaw[] = [
  {
    name: 'Demos',
    path: '/demos',
    component: AppLayout,
    meta: {
      icon: 'ic:baseline-view-in-ar',
      keepAlive: true,
      title: '标题',
    },
    children: [
      // 权限控制
      {
        name: 'AccessDemos',
        path: '/demos/access',
        meta: {
          icon: 'mdi:shield-key-outline',
          title: '前端权限',
        },
        children: [
          {
            name: 'AccessPageControlDemo',
            path: '/demos/access/page-control',
            component: Demo,
            meta: {
              icon: 'mdi:page-previous-outline',
              title: '页面访问',
            },
          },
          {
            name: 'AccessButtonControlDemo',
            path: '/demos/access/button-control',
            component: Demo,
            meta: {
              icon: 'mdi:button-cursor',
              title: '按钮控制',
            },
          },
          {
            name: 'AccessMenuVisible403Demo',
            path: '/demos/access/menu-visible-403',
            component: Demo,
            meta: {
              authority: ['no-body'],
              icon: 'mdi:button-cursor',
              menuVisibleWithForbidden: true,
              title: '菜单可见(403)',
            },
          },
          {
            name: 'AccessSuperVisibleDemo',
            path: '/demos/access/super-visible',
            component: Demo,
            meta: {
              authority: ['super'],
              icon: 'mdi:button-cursor',
              title: 'Super可见',
            },
          },
        ],
      },
      // 功能
      {
        name: 'FeaturesDemos',
        path: '/demos/features',
        meta: {
          icon: 'mdi:feature-highlight',
          title: '功能',
        },
        children: [
          {
            name: 'LoginExpiredDemo',
            path: '/demos/features/login-expired',
            component: Demo,
            meta: {
              icon: 'mdi:encryption-expiration',
              title: '登录过期',
            },
          },
          {
            name: 'IconsDemo',
            path: '/demos/features/icons',
            component: Demo,
            meta: {
              icon: 'lucide:annoyed',
              title: '图标',
            },
          },
          {
            name: 'WatermarkDemo',
            path: '/demos/features/watermark',
            component: Demo,
            meta: {
              icon: 'lucide:tags',
              title: '水印',
            },
          },
          {
            name: 'FeatureTabsDemo',
            path: '/demos/features/tabs',
            component: Demo,
            meta: {
              icon: 'lucide:app-window',
              title: '标签页',
            },
          },
          {
            name: 'HideChildrenInMenuParentDemo',
            path: '/demos/features/hide-menu-children',
            component: Demo,
            meta: {
              hideChildrenInMenu: true,
              icon: 'ic:round-menu',
              title: '隐藏子菜单',
            },
            children: [
              {
                name: 'HideChildrenInMenuChildrenDemo',
                path: '/demos/features/hide-menu-children/children',
                component: Demo,
                meta: { title: '标题' },
              },
            ],
          },
          {
            name: 'FullScreenDemo',
            path: '/demos/features/full-screen',
            component: Demo,
            meta: {
              icon: 'lucide:fullscreen',
              title: '全屏',
            },
          },
          {
            name: 'ClipboardDemo',
            path: '/demos/features/clipboard',
            component: Demo,
            meta: {
              icon: 'lucide:copy',
              title: '剪贴板',
            },
          },
          {
            name: 'VueQueryDemo',
            path: '/demos/features/vue-query',
            component: Demo,
            meta: {
              icon: 'lucide:git-pull-request-arrow',
              title: '带参菜单',
            },
          },
        ],
      },
      // 面包屑导航
      {
        name: 'BreadcrumbDemos',
        path: '/demos/breadcrumb',
        meta: {
          icon: 'lucide:navigation',
          title: '面包屑导航',
        },
        children: [
          {
            name: 'BreadcrumbLateralDemo',
            path: '/demos/breadcrumb/lateral',
            component: Demo,
            meta: {
              icon: 'lucide:navigation',
              title: '平级模式',
            },
          },
          {
            name: 'BreadcrumbLevelDemo',
            path: '/demos/breadcrumb/level',
            meta: {
              icon: 'lucide:navigation',
              title: '层级模式',
            },
            children: [
              {
                name: 'BreadcrumbLevelDetailDemo',
                path: '/demos/breadcrumb/level/detail',
                component: Demo,
                meta: {
                  title: '层级模式详情',
                },
              },
            ],
          },
        ],
      },
      // 缺省页
      {
        name: 'FallbackDemos',
        path: '/demos/fallback',
        meta: {
          icon: 'mdi:lightbulb-error-outline',
          title: '缺省页',
        },
        children: [
          {
            name: 'Fallback403Demo',
            path: '/demos/fallback/403',
            component: Demo,
            meta: {
              icon: 'mdi:do-not-disturb-alt',
              title: '403',
            },
          },
          {
            name: 'Fallback404Demo',
            path: '/demos/fallback/404',
            component: Demo,
            meta: {
              icon: 'mdi:table-off',
              title: '404',
            },
          },
          {
            name: 'Fallback500Demo',
            path: '/demos/fallback/500',
            component: Demo,
            meta: {
              icon: 'mdi:server-network-off',
              title: '500',
            },
          },
          {
            name: 'FallbackOfflineDemo',
            path: '/demos/fallback/offline',
            component: Demo,
            meta: {
              icon: 'mdi:offline',
              title: '离线页面',
            },
          },
        ],
      },
      // 菜单徽标
      {
        name: 'BadgeDemos',
        path: '/demos/badge',
        meta: {
          badgeType: 'dot',
          badgeVariants: 'destructive',
          icon: 'lucide:circle-dot',
          title: '菜单徽标',
        },
        children: [
          {
            name: 'BadgeDotDemo',
            path: '/demos/badge/dot',
            component: Demo,
            meta: {
              badgeType: 'dot',
              icon: 'lucide:square-dot',
              title: '点徽标',
            },
          },
          {
            name: 'BadgeTextDemo',
            path: '/demos/badge/text',
            component: Demo,
            meta: {
              badge: '10',
              icon: 'lucide:square-dot',
              title: '文本徽标',
            },
          },
          {
            name: 'BadgeColorDemo',
            path: '/demos/badge/color',
            component: Demo,
            meta: {
              badge: 'Hot',
              badgeVariants: 'destructive',
              icon: 'lucide:square-dot',
              title: '徽标颜色',
            },
          },
        ],
      },
      // 菜单激活图标
      {
        name: 'ActiveIconDemos',
        path: '/demos/active-icon',
        meta: {
          activeIcon: 'fluent-emoji:radioactive',
          icon: 'bi:radioactive',
          title: '菜单激活图标',
        },
        children: [
          {
            name: 'ActiveIconDemo',
            path: '/demos/active-icon/children',
            component: Demo,
            meta: {
              activeIcon: 'fluent-emoji:radioactive',
              icon: 'bi:radioactive',
              title: '子级激活图标',
            },
          },
        ],
      },
      // 嵌套菜单
      {
        name: 'NestedDemos',
        path: '/demos/nested',
        meta: {
          icon: 'ic:round-menu',
          title: '嵌套菜单',
        },
        children: [
          {
            name: 'Menu1Demo',
            path: '/demos/nested/menu1',
            component: Demo,
            meta: {
              icon: 'ic:round-menu',
              keepAlive: true,
              title: '菜单1',
            },
          },
          {
            name: 'Menu2Demo',
            path: '/demos/nested/menu2',
            meta: {
              icon: 'ic:round-menu',
              keepAlive: true,
              title: '菜单2',
            },
            children: [
              {
                name: 'Menu21Demo',
                path: '/demos/nested/menu2/menu2-1',
                component: Demo,
                meta: {
                  icon: 'ic:round-menu',
                  keepAlive: true,
                  title: '菜单2-1',
                },
              },
            ],
          },
          {
            name: 'Menu3Demo',
            path: '/demos/nested/menu3',
            meta: {
              icon: 'ic:round-menu',
              title: '菜单3',
            },
            children: [
              {
                name: 'Menu31Demo',
                path: 'menu3-1',
                component: Demo,
                meta: {
                  icon: 'ic:round-menu',
                  keepAlive: true,
                  title: '菜单3-1',
                },
              },
              {
                name: 'Menu32Demo',
                path: 'menu3-2',
                meta: {
                  icon: 'ic:round-menu',
                  title: '菜单3-2',
                },
                children: [
                  {
                    name: 'Menu321Demo',
                    path: '/demos/nested/menu3/menu3-2/menu3-2-1',
                    component: Demo,
                    meta: {
                      icon: 'ic:round-menu',
                      keepAlive: true,
                      title: '菜单3-2-1',
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
]

export default routes
