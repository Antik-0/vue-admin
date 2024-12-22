import type { Component, Ref } from 'vue'

interface MenuRecordRaw {
  /**
   * 菜单路径
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
   * 当前激活的菜单
   */
  activePath?: string
  /**
   * 隐藏当前菜单
   * @default false
   */
  hide?: boolean
  /**
   * 隐藏子菜单
   * @default false
   */
  hideChildren?: boolean
  /**
   * 菜单排序
   */
  order?: number
}

interface MenuState {
  menu: Ref<MenuRecordRaw[]>
}

export type { MenuRecordRaw, MenuState }
