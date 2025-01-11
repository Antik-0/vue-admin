import type { IconProps as IconifyIconProps } from '@iconify/vue'
import type { Component, FunctionalComponent, MaybeRefOrGetter } from 'vue'
import { Icon as IconifyIcon } from '@iconify/vue'
import { h, toValue } from 'vue'
import { isComponent } from '@repo/utils'

type CreateIconReturn = FunctionalComponent<Omit<IconifyIconProps, 'icon'>>

export function createIcon(name: MaybeRefOrGetter<string>): CreateIconReturn {
  const iconName = toValue(name)
  return (props, { attrs }) =>
    h(IconifyIcon, {
      icon: iconName,
      ...props,
      ...attrs,
    })
}

interface FunctionalIconProps {
  icon?: string | Component
}

type FunctionalIcon = FunctionalComponent<FunctionalIconProps>

export const Icon: FunctionalIcon = props => {
  const { icon } = props
  if (!icon) return null
  return h(isComponent(icon) ? icon : createIcon(icon))
}
