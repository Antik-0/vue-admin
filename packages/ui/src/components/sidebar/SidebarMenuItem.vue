<script setup lang="ts">
import type { MenuRecordRaw } from '@core/types'
import { computed } from 'vue'
import { Icon } from '#/icons'
import { MenuItem, MenuItemGroup, MenuItemLink, MenuSub } from '../menu'

interface Props {
  menuItem: MenuRecordRaw
}

const props = withDefaults(defineProps<Props>(), {})

const hasSubMenu = computed(() => {
  const menuItem = props.menuItem
  return !menuItem.isGroup && menuItem.children.length !== 0
})
</script>

<template>
  <MenuSub v-if="hasSubMenu" :index="menuItem.path">
    <template #title>
      <Icon
        v-if="menuItem.icon"
        class="shrink-0 transition-transform duration-400 group-hover/item:scale-120"
        :icon="menuItem.icon"
      />
      <span>{{ menuItem.name }}</span>
    </template>
    <SidebarMenuItem
      v-for="subMenuItem in menuItem.children"
      :key="subMenuItem.key"
      :menu-item="subMenuItem"
    />
  </MenuSub>
  <MenuItemGroup v-else-if="menuItem.isGroup">
    <template #title>
      <span>{{ menuItem.name }}</span>
    </template>
    <SidebarMenuItem
      v-for="subMenuItem in menuItem.children"
      :key="subMenuItem.key"
      :menu-item="subMenuItem"
    />
  </MenuItemGroup>
  <MenuItem v-else :index="menuItem.path" as-child>
    <MenuItemLink :to="menuItem.path">
      <Icon
        v-if="menuItem.icon"
        class="shrink-0 transition-transform duration-400 group-hover/item:scale-120"
        :icon="menuItem.icon"
      />
      <span>{{ menuItem.name }}</span>
    </MenuItemLink>
  </MenuItem>
</template>
