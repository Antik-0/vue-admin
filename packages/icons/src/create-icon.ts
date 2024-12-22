import type { IconProps } from '@iconify/vue'
import type { FunctionalComponent, MaybeRefOrGetter } from 'vue'
import { Icon } from '@iconify/vue'
import { h, toValue } from 'vue'

type FuncIconProps = Omit<IconProps, 'icon'>

type IconifyIcon = FunctionalComponent<FuncIconProps>

export function createIcon(name: MaybeRefOrGetter<string>) {
  const iconName = toValue(name)

  const iconifyIcon: IconifyIcon = (props, { attrs }) =>
    h(Icon, {
      icon: iconName,
      ...props,
      ...attrs,
    })

  return iconifyIcon
}
