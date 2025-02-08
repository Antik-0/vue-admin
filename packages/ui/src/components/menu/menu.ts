import type { PrimitiveProps } from 'radix-vue'
import type { ComponentInstance, HTMLAttributes, Ref } from 'vue'

/**
 * menu css var
 */
export const MENU_BASE_PADDING = '12px'
export const MENU_LEVEL_PADDING = '24px'
export const MENU_ICON_SIZE = '16px'
export const MENU_PADDING_OFFSET =
  'calc(var(--menu-base-padding) + var(--menu-level, 0) * var(--menu-level-padding))'
export const MENU_BG_COLOR = '#fff'

export type { ComponentInstance, PrimitiveProps }

export interface MenuProps {
  /**
   * 是否启用百叶窗效果
   */
  accordion?: boolean
  /**
   * 自定义class
   */
  class?: HTMLAttributes['class']
  /**
   * 是否折叠
   */
  collapse?: boolean
  /**
   * 默认激活的菜单index
   */
  defaultIndex?: string
}

export interface MenuItemProps extends PrimitiveProps {
  /**
   * 菜单唯一标识
   */
  index: string
  /**
   * 自定义class
   */
  class?: HTMLAttributes['class']
  /**
   * 是否禁用菜单
   */
  disabled?: boolean
}

export interface MenuSubProps {
  /**
   * 子菜单唯一标识
   */
  index: string
  /**
   * 子菜单标题
   */
  title?: string
  /**
   * 是否禁用子菜单
   */
  disabled?: boolean
}

export interface MenuProvider {
  /**
   * 激活的菜单标识
   */
  activeIndex: Ref<string>
  /**
   * 激活的菜单路径集合
   */
  activeMenus: Ref<string[]>
  /**
   * 菜单是否处于折叠状态
   */
  isCollapsed: Ref<boolean>
  /**
   * 打开的菜单路径集合
   */
  openedMenus: Ref<string[]>
  /**
   * 处理子菜单的点击
   */
  handleMenuSubClick: (index: string, indexPath: string[]) => void
  /**
   * 处理菜单项的点击
   */
  handleMenuItemClick: (index: string, indexPath: string[]) => void
}

export interface MenuSubProvider {
  /**
   * 当前子菜单的层级
   */
  menuLevel: number
}
