import type { Component } from 'vue'

interface RouteMeta {
  /**
   * 路由标题
   */
  title: string
  /**
   * 路由图标(菜单/tab)
   */
  icon?: string | Component
  /**
   * 路由激活图标(菜单/tab)
   */
  activeIcon?: string | Component
  /**
   * 当前激活的菜单，有时候不想激活现有菜单，需要激活父级菜单时使用
   */
  activePath?: string
  /**
   * 是否固定在标签栏
   * @default false
   */
  affixTab?: boolean
  /**
   * 权限控制
   */
  authority?: string[]
  /**
   * 在侧边栏中隐藏
   * @default false
   */
  hideInMenu?: boolean
  /**
   * 隐藏当前路由的子路由
   * @default false
   */
  hideChildrenInMenu?: boolean
  /**
   * 在面包屑中隐藏
   * @default false
   */
  hideInBreadcrumb?: boolean
  /**
   * 在标签栏中隐藏
   * @default false
   */
  hideInTab?: boolean
  /**
   * 是否持久化缓存
   * @default false
   */
  keepAlive?: boolean
  /**
   * 外链-跳转链接
   */
  link?: string
  /**
   * 路由页面是否已加载
   */
  loaded?: boolean
  /**
   * 路由-菜单排序
   */
  order?: number
}

export { RouteMeta }
