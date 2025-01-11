<script setup lang="ts">
import type { SidebarProps } from '#/shadcn-ui/sidebar'
import { computed, reactive, shallowRef } from 'vue'
import { IconButton } from '#/components'
import {
  Icon,
  IconChevronsLeft,
  IconChevronsRight,
  IconMenu,
  IconPin,
  IconPinOff,
} from '#/icons'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '#/shadcn-ui/sidebar'
import { useSidebar } from '#/shadcn-ui/sidebar'

const { toggleSidebar } = useSidebar()

const items = shallowRef([
  {
    icon: IconMenu,
    title: 'Home',
    url: '#',
  },
  {
    icon: IconMenu,
    title: 'Inbox',
    url: '#',
  },
  {
    icon: IconMenu,
    title: 'Calendar',
    url: '#',
  },
  {
    icon: IconMenu,
    title: 'Search',
    url: '#',
  },
  {
    icon: IconMenu,
    title: 'Settings',
    url: '#',
  },
])

const sidebarProps = reactive<
  Required<Pick<SidebarProps, 'collapsible' | 'side' | 'variant'>>
>({
  collapsible: 'none',
  side: 'left',
  variant: 'sidebar',
})

const isIconCollapsible = computed(() => sidebarProps.collapsible === 'icon')

function toggleCollapsible() {
  if (sidebarProps.collapsible === 'none') {
    sidebarProps.collapsible = 'icon'
  } else {
    sidebarProps.collapsible = 'none'
  }
  toggleSidebar()
}
</script>

<template>
  <Sidebar v-bind="sidebarProps">
    <SidebarHeader>
      <div class="flex items-center">
        <IconButton :icon="IconPinOff" />
      </div>
    </SidebarHeader>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Application</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem v-for="item in items" :key="item.title">
              <SidebarMenuButton as-child>
                <a href="#">
                  <Icon :icon="item.icon" />
                  <span>{{ item.title }}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
    <SidebarFooter>
      <div class="flex items-center justify-between">
        <IconButton
          :icon="isIconCollapsible ? IconChevronsRight : IconChevronsLeft"
          class="size-6"
          @click="toggleCollapsible"
        />
        <IconButton :icon="IconPin" class="size-6" />
      </div>
    </SidebarFooter>
  </Sidebar>
</template>
