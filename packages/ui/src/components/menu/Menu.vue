<script setup lang="ts">
import type { MenuProps, MenuSubProvider, StyleValue } from './types'
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

const { isAccordion, isCollapse, menuCssVar } = useMenu(props)

const menuElementState = computed(() => {
  return {
    'data-accordion': isAccordion.value,
    'data-collapse': isCollapse.value,
  }
})

const menuStyle = computed<StyleValue>(() => {
  return {
    ...menuCssVar,
  }
})

const instance = getCurrentInstance()!
provide<MenuSubProvider>(`menusub:${instance.uid}`, {
  menuLevel: 0,
})
</script>

<template>
  <menu
    :class="cn('flex flex-col gap-1', props.class)"
    v-bind="menuElementState"
    role="menu"
    :style="menuStyle"
  >
    <slot></slot>
  </menu>
</template>
