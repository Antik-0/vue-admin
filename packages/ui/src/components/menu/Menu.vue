<script setup lang="ts">
import type {
  MenuProps,
  MenuProvider,
  MenuSubProvider,
  StyleValue,
} from './types'
import { computed, getCurrentInstance, provide } from 'vue'
import { cn } from '#/utils'
import { useMenu } from './use-menu'

defineOptions({ name: 'MenuView' })

const props = withDefaults(defineProps<MenuProps>(), {
  accordion: false,
  class: '',
  collapse: false,
  defaultIndex: '',
})

const {
  activeIndex,
  activeMenus,
  levelOffsetCssVar,
  menuCssVar,
  openedMenus,
  // methods
  handleMenuItemClick,
  handleMenuSubClick,
} = useMenu(props)

const menuStyle = computed<StyleValue>(() => {
  return {
    ...menuCssVar,
  }
})

const isCollapsed = computed(() => props.collapse === true)

const instance = getCurrentInstance()!

provide<MenuProvider>('rootMenu', {
  activeIndex,
  activeMenus,
  handleMenuItemClick,
  handleMenuSubClick,
  isCollapsed,
  levelOffsetCssVar,
  openedMenus,
})

provide<MenuSubProvider>(`menusub:${instance.uid}`, {
  menuLevel: 0,
})
</script>

<template>
  <menu
    :class="cn('ui-menu flex flex-col gap-1', props.class)"
    :data-accordion="props.accordion"
    :data-collapse="props.collapse"
    role="menu"
    :style="menuStyle"
  >
    <slot></slot>
  </menu>
</template>
