<script setup lang="ts">
import type { MenuRecordRaw } from '@core/types'
import { SidebarMenu as UISidebarMenu } from '#/shadcn-ui/sidebar'
import SidebarMenuItem from './SidebarMenuItem.vue'

interface Props {
  menus: MenuRecordRaw[]
}

withDefaults(defineProps<Props>(), {
  menus: () => [],
})
</script>

<template>
  <UISidebarMenu>
    <SidebarMenuItem
      v-for="menuItem in menus"
      :key="menuItem.key"
      :menu-item="menuItem"
    />
  </UISidebarMenu>
</template>
