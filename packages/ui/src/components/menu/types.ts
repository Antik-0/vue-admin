import type { PrimitiveProps } from 'radix-vue'
import type { ComponentInstance, HTMLAttributes, StyleValue } from 'vue'

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

export interface MenuSubProvider {
  menuLevel: number
}

export interface MenuItemGroupProps {
  title?: string
}
