import type { Component } from 'vue'

interface MenuRecordRaw {
  /**
   * 菜单唯一标识符
   */
  key: string
  /**
   * 菜单路由
   */
  path: string
  /**
   * 菜单名称
   */
  name: string
  /**
   * 子菜单
   */
  children: MenuRecordRaw[]
  /**
   * 菜单图标
   */
  icon?: string | Component
  /**
   * 菜单激活图标
   */
  activeIcon?: string | Component
  /**
   * 是否分组，true：会缩小一层嵌套
   * @default false
   */
  isGroup: boolean
  /**
   * isGroup 模式下是否可折叠
   * @default false
   */
  collapsible: boolean
  /**
   * 隐藏菜单
   * @default false
   */
  hidden: boolean
  /**
   * 隐藏子菜单
   * @default false
   */
  hideChildren: boolean
  /**
   * 排序
   */
  order: number
}

export type { MenuRecordRaw }
