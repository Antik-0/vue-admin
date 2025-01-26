<script setup lang="ts">
import type { MenuItemGroupProps, MenuProvider, StyleValue } from './types'
import { computed, inject } from 'vue'

defineProps<MenuItemGroupProps>()

const rootMenu = inject<MenuProvider>('rootMenu')!
if (!rootMenu) throw new Error('<MenuItem> can not inject root menu')

const groupLabelStyle = computed<StyleValue>(() => {
  return {
    paddingLeft: rootMenu.levelOffsetCssVar,
  }
})
</script>

<template>
  <div class="py-2">
    <div
      class="h-8 w-full flex items-center px-2 text-sm text-sidebar-accent-foreground font-medium"
      :style="groupLabelStyle"
    >
      <slot name="title">
        <span>{{ title }}</span>
      </slot>
    </div>

    <ol class="flex flex-col list-none gap-2" role="menu">
      <slot></slot>
    </ol>
  </div>
</template>
