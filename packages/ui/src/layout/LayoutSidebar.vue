<script setup lang="ts">
import type { SidebarProps } from '#/components/sidebar'
import { computed, reactive } from 'vue'
import { IconButton } from '#/components'
import { Menu as SidebarMenu } from '#/components/menu'
import { Sidebar, SidebarMenuItem } from '#/components/sidebar'
import { IconChevronsLeft, IconChevronsRight, IconPin } from '#/icons'
import { useSidebarMenu } from './hooks/use-menu'

const { sidebarMenu } = useSidebarMenu()

const sidebarState = reactive<SidebarProps>({
  collapsible: 'icon',
  side: 'left',
  variant: 'sidebar',
})

console.log('>>>>', sidebarMenu.value)

const isIconCollapsible = computed(() => sidebarState.collapsible === 'icon')
</script>

<template>
  <Sidebar v-bind="sidebarState">
    <template #header>
      <div class="flex items-center justify-between">
        <IconButton
          class="size-6"
          :icon="isIconCollapsible ? IconChevronsRight : IconChevronsLeft"
        />
        <IconButton class="size-6" :icon="IconPin" />
      </div>
    </template>

    <SidebarMenu :accordion="false" class="p-2">
      <SidebarMenuItem
        v-for="menuItem in sidebarMenu"
        :key="menuItem.key"
        :menu-item="menuItem"
      />
    </SidebarMenu>

    <template #footer>
      <div class="flex items-center justify-between">
        <IconButton
          class="size-6"
          :icon="isIconCollapsible ? IconChevronsRight : IconChevronsLeft"
        />
        <IconButton class="size-6" :icon="IconPin" />
      </div>
    </template>
  </Sidebar>
</template>
