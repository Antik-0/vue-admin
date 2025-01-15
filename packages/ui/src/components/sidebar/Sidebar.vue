<script setup lang="ts">
import type { SidebarProps } from './index'
import { computed } from 'vue'
import { IconButton } from '#/components'
import {
  IconChevronsLeft,
  IconChevronsRight,
  IconPin,
  IconPinOff,
} from '#/icons'
import { Sidebar, SidebarFooter, SidebarHeader } from '#/shadcn-ui/sidebar'

interface Props extends SidebarProps {}

const props = withDefaults(defineProps<Props>(), {
  collapsible: 'icon',
  side: 'left',
  variant: 'sidebar',
  sidebarMenu: () => [],
})

const isIconCollapsible = computed(() => props.collapsible === 'icon')
</script>

<template>
  <Sidebar v-bind="props">
    <SidebarHeader>
      <div class="flex items-center">
        <IconButton :icon="IconPinOff" />
      </div>
    </SidebarHeader>

    <SidebarFooter>
      <div class="flex items-center justify-between">
        <IconButton
          :icon="isIconCollapsible ? IconChevronsRight : IconChevronsLeft"
          class="size-6"
        />
        <IconButton :icon="IconPin" class="size-6" />
      </div>
    </SidebarFooter>
  </Sidebar>
</template>
