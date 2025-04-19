import type { IconifyIconProperties } from 'iconify-icon'
import type { Component, FunctionalComponent, MaybeRefOrGetter } from 'vue'
import { h, toValue } from 'vue'
import { isComponent } from '@repo/utils'

type RawIconProps = Omit<IconifyIconProperties, 'icon'>

type CreateIconReturn = FunctionalComponent<RawIconProps>

export function createIcon(name: MaybeRefOrGetter<string>): CreateIconReturn {
  return (props, { attrs }) =>
    h('iconify-icon', {
      icon: toValue(name),
      ...props,
      ...attrs,
    })
}

interface IconProps extends RawIconProps {
  icon?: string | Component
}

type FunctionalIcon = FunctionalComponent<IconProps>

export const Icon: FunctionalIcon = props => {
  const { icon, ...restProps } = props
  if (!icon) return null
  return h(isComponent(icon) ? icon : createIcon(icon), restProps)
}
