<script setup lang="ts">
import type { MenuRecordRaw } from '@core/types'
import { shallowRef, watchEffect } from 'vue'
import { SidebarContent as UISidebarContent } from '#/shadcn-ui/sidebar'
import SidebarGroup from './SidebarGroup.vue'

interface Props {
  menus?: MenuRecordRaw[]
}

type MenuGroups = (MenuRecordRaw | MenuRecordRaw[])[]

const props = withDefaults(defineProps<Props>(), {
  menus: () => [],
})

function menusGrouping(menus: MenuRecordRaw[]) {
  const menuGroups: MenuGroups = []

  for (const menuItem of menus) {
    if (menuItem.isGroup) {
      menuGroups.push(menuItem)
    } else {
      let lastGroup = menuGroups.at(-1)
      if (!Array.isArray(lastGroup)) {
        menuGroups.push([])
        lastGroup = menuGroups.at(-1)
      }
      ;(lastGroup as MenuRecordRaw[]).push(menuItem)
    }
  }

  return menuGroups
}

const menuGroups = shallowRef<MenuGroups>([])
watchEffect(() => {
  menuGroups.value = menusGrouping(props.menus)
})
</script>

<template>
  <UISidebarContent>
    <SidebarGroup
      v-for="(menuGroup, index) in menuGroups"
      :key="index"
      :menu-group="menuGroup"
    />
  </UISidebarContent>
</template>
