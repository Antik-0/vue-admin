<script setup lang="ts">
import type { MenuItemProps, MenuSubProps, StyleValue } from './types'
import { Primitive } from 'radix-vue'
import { computed, getCurrentInstance } from 'vue'
import { cn } from '#/utils'
import { useMenu } from './use-menu'

const props = withDefaults(defineProps<MenuItemProps>(), {
  as: 'div',
  asChild: false,
  class: '',
  disabled: false,
})

const slots = defineSlots<{
  action?(): any
  default(): any
}>()

const { activeIndex, activeParentIndex, levelOffsetCssVar } = useMenu()

const menuItemStyle = computed<StyleValue>(() => {
  return {
    paddingLeft: levelOffsetCssVar,
    paddingRight: `calc(${slots.action ? 'var(--menu-padding) + 24px' : 'var(--menu-padding)'})`,
  }
})

const instance = getCurrentInstance()

function activateParentMenu() {
  if (!instance) return

  let parent = instance.parent
  const parentIndexSet = []
  while (parent) {
    if (parent.type.name === 'MenuSub') {
      const parentIndex = (parent.props as unknown as MenuSubProps).index
      parentIndexSet.push(parentIndex)
    }
    parent = parent.parent
  }
  activeParentIndex.value = parentIndexSet
}

function handleItemClick() {
  activeIndex.value = props.index
  activateParentMenu()
}
</script>

<template>
  <li
    class="group/item relative box-border h-10 w-full cursor-pointer list-none rounded-md transition-[all] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
    :class="{ 'is-active': index === activeIndex }"
    role="menuitem"
    @click="handleItemClick"
  >
    <Primitive
      :as="as"
      :as-child="asChild"
      :class="
        cn(
          'h-full w-full flex items-center gap-2 whitespace-nowrap py-2 text-base group-[.is-active]/item:text-rose-500',
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
