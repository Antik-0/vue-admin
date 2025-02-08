<script setup lang="ts">
import type { MenuRecordRaw } from '@core/types'
import { computed } from 'vue'
import { Icon } from '#/icons'
import {
  MenuItem,
  MenuItemGroup,
  MenuItemLink,
  MenuSub,
} from '../components/menu'

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
        class="ui-menu-item__icon"
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
  <MenuItemGroup v-else-if="menuItem.isGroup" :title="menuItem.name">
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
        class="ui-menu-item__icon"
        :icon="menuItem.icon"
      />
      <span>{{ menuItem.name }}</span>
    </MenuItemLink>
  </MenuItem>
</template>

<style>
.ui-menu-item__icon {
  transition: transform 0.4s ease-in-out;
}

.ui-menu-sub__title:not(.is-disabled):hover > .ui-menu-item__icon {
  transform: scale(1.2);
}

.ui-menu-item:not(.is-disabled):hover
  > .ui-menu-item__content
  > .ui-menu-item__icon {
  transform: scale(1.2);
}
</style>
