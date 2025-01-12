import type { Component } from 'vue'

interface RouteMetaRaw {
  /**
   * 路由标题
   */
  title: string
  /**
   * 路由图标(menu/tab)
   */
  icon?: string | Component
  /**
   * 路由激活图标(menu/tab)
   */
  activeIcon?: string | Component
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
   * 在标签栏中隐藏
   * @default false
   */
  hideInTab?: boolean
  /**
   * 在菜单中隐藏
   * @default false
   */
  hideInMenu?: boolean
  /**
   * 在菜单中隐藏子菜单
   * @default false
   */
  hideChildrenInMenu?: boolean
  /**
   * 在菜单中是否分组，true：会缩小一层嵌套
   * @default false
   */
  isGroup?: boolean
  /**
   * isGroup 模式下是否可折叠
   * @default false
   */
  collapsible?: boolean
  /**
   * 在面包屑中隐藏
   * @default false
   */
  hideInBreadcrumb?: boolean
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

export type { RouteMetaRaw }
