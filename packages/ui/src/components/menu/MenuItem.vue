<script setup lang="ts">
import type { HtmlHTMLAttributes, StyleValue } from 'vue'
import { type PrimitiveProps, Primitive } from 'radix-vue'
import { computed } from 'vue'
import { cn } from '#/utils'
import { useMenu } from './use-menu'

interface Props extends PrimitiveProps {
  class?: HtmlHTMLAttributes['class']
}

const props = withDefaults(defineProps<Props>(), {
  as: 'div',
  asChild: false,
})

const slots = defineSlots<{
  action?(): any
  default(): any
}>()

const { levelOffsetCssVar } = useMenu()

const menuItemStyle = computed<StyleValue>(() => {
  return {
    paddingLeft: levelOffsetCssVar,
    paddingRight: `calc(${slots.action ? 'var(--menu-padding) + 24px' : 'var(--menu-padding)'})`,
  }
})
</script>

<template>
  <li
    class="group/item relative box-border h-10 w-full cursor-pointer list-none rounded-md transition-[all] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
    role="menuitem"
  >
    <Primitive
      :as="as"
      :as-child="asChild"
      :class="
        cn(
          'h-full w-full flex items-center gap-2 whitespace-nowrap py-2 text-base [&>svg]:shrink-0 [&>svg]:transition-transform [&>svg]:duration-400 group-hover/item:[&>svg]:scale-120',
          props.class
        )
      "
      :style="menuItemStyle"
    >
      <slot></slot>
    </Primitive>
    <span
      v-if="slots.action"
      class="top-center absolute right-[var(--menu-padding)] cursor-pointer"
    >
      <slot name="action"></slot>
    </span>
  </li>
</template>
