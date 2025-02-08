<script setup lang="ts">
import { IconButton } from '#/components'
import {
  IconChevronsLeft,
  IconChevronsRight,
  IconPin,
  IconPinOff,
} from '#/icons'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from '#/sidebar-ui'

interface Props {
  logoImage?: string
  logoTitle?: string
}

withDefaults(defineProps<Props>(), {
  logoTitle: 'Vue Admin',
})

const { collapse, floating, isMobile } = useSidebar()

import { useSidebarMenu } from './hooks/use-menu'

const { sidebarMenu } = useSidebarMenu()
</script>

<template>
  <Sidebar>
    <SidebarHeader>
      <div class="flex items-center gap-2">
        <span
          v-if="logoImage"
          class="flex-center flex shrink-0 overflow-hidden rounded transition-[width,height] duration-[--sidebar-duration] ease-[--sidebar-easefunc]"
          :class="collapse ? 'size-10' : 'size-12'"
        >
          <img
            :alt="logoTitle"
            class="h-full w-full object-cover"
            :src="logoImage"
          />
        </span>
        <span
          v-show="!collapse"
          class="overflow-hidden whitespace-nowrap text-lg text-foreground font-semibold"
        >
          {{ logoTitle }}
        </span>
      </div>
    </SidebarHeader>

    <SidebarContent class="p-2">
      <SidebarMenu accordion>
        <SidebarMenuItem
          v-for="menuItem in sidebarMenu"
          :key="menuItem.key"
          :menu-item="menuItem"
        />
      </SidebarMenu>
    </SidebarContent>

    <SidebarFooter v-if="!isMobile">
      <div class="flex items-center justify-between px-1">
        <SidebarTrigger type="collapse">
          <IconButton
            :icon="collapse ? IconChevronsRight : IconChevronsLeft"
            variant="ghost"
          />
        </SidebarTrigger>

        <SidebarTrigger type="floating">
          <IconButton
            v-show="!collapse"
            :icon="floating ? IconPin : IconPinOff"
            variant="ghost"
          />
        </SidebarTrigger>
      </div>
    </SidebarFooter>
  </Sidebar>
</template>
