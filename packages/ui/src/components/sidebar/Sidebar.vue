<script setup lang="ts">
import type { SidebarProps } from './index'
import { ScrollArea } from '#/shadcn-ui/scroll-area'
import { Sidebar } from '#/shadcn-ui/sidebar'
import SidebarFooter from './SidebarFooter.vue'
import SidebarHeader from './SidebarHeader.vue'

interface Props extends SidebarProps {}

defineOptions({ name: 'SidebarView' })

const props = withDefaults(defineProps<Props>(), {
  collapsible: 'icon',
  side: 'left',
  variant: 'sidebar',
})
</script>

<template>
  <Sidebar v-bind="props">
    <SidebarHeader>
      <slot name="header"> </slot>
    </SidebarHeader>

    <ScrollArea class="flex-1">
      <slot></slot>
    </ScrollArea>

    <SidebarFooter>
      <slot name="footer"> </slot>
    </SidebarFooter>
  </Sidebar>
</template>
