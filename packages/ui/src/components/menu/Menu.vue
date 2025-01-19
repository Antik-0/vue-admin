<script setup lang="ts">
import type { HTMLAttributes, StyleValue } from 'vue'
import type { MenuProps, MenuSubProvider } from './types'
import { computed, getCurrentInstance, provide } from 'vue'
import { cn } from '#/utils'
import { useMenu } from './use-menu'

interface Props extends MenuProps {
  class?: HTMLAttributes['class']
}

defineOptions({ name: 'MenuView' })

const props = withDefaults(defineProps<Props>(), {
  accordion: false,
  collapse: false,
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
    :style="menuStyle"
    v-bind="menuElementState"
    role="menu"
  >
    <slot></slot>
  </menu>
</template>
