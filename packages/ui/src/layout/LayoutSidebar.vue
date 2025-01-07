<script setup lang="ts">
import { ref } from 'vue'
import { IconMenu } from '#/icons'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '#/shadcn-ui'

const items = ref([
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
</script>

<template>
  <Sidebar>
    <SidebarHeader />
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Application</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem v-for="item in items" :key="item.title">
              <SidebarMenuButton as-child>
                <a href="#">
                  <component :is="item.icon" />
                  <span>{{ item.title }}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
    <SidebarFooter />
  </Sidebar>
</template>
