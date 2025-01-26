import type { PrimitiveProps } from 'radix-vue'
import type { ComponentInstance, HTMLAttributes, Ref, StyleValue } from 'vue'

export type { ComponentInstance, PrimitiveProps, StyleValue }

export interface MenuProps {
  accordion?: boolean
  class?: HTMLAttributes['class']
  collapse?: boolean
  defaultIndex?: string
}

export interface MenuItemProps extends PrimitiveProps {
  index: string
  class?: HTMLAttributes['class']
  disabled?: boolean
}

export interface MenuSubProps {
  index: string
  disabled?: boolean
  title?: string
}

export interface MenuItemGroupProps {
  title?: string
}

export interface MenuProvider {
  activeIndex: Ref<string>
  activeMenus: Ref<string[]>
  isCollapsed: Ref<boolean>
  levelOffsetCssVar: string
  openedMenus: Ref<string[]>
  handleMenuItemClick: (index: string, indexPath: string[]) => void
  handleMenuSubClick: (index: string, indexPath: string[]) => void
}

export interface MenuSubProvider {
  menuLevel: number
}
