<script setup lang="ts">
import { inject } from 'vue'
import { type MenuProvider, MENU_PADDING_OFFSET } from './menu'

defineProps<{
  /**
   * 菜单分组标题
   */
  title?: string
}>()

const rootMenu = inject<MenuProvider>('rootMenu')!
if (!rootMenu) throw new Error('<MenuItemGroup> can not inject root menu')

const { isCollapsed } = rootMenu
</script>

<template>
  <div v-if="!isCollapsed" class="py-2" data-menu="menugroup" role="menuitem">
    <div
      class="h-8 w-full flex items-center whitespace-nowrap px-[--menu-base-padding] text-sm text-muted-foreground/80 font-medium"
      :style="{
        paddingLeft: MENU_PADDING_OFFSET,
      }"
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
