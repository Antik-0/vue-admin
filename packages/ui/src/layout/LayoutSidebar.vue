<script setup lang="ts">
import type { SidebarPropsRaw } from '#/components/sidebar'
import { reactive } from 'vue'
import { Sidebar } from '#/components/sidebar'
import { useSidebarMenu } from './hooks/use-menu'

const { sidebarMenu } = useSidebarMenu()

const sidebarState = reactive<SidebarPropsRaw>({
  collapsible: 'icon',
  side: 'left',
  variant: 'sidebar',
})
</script>

<template>
  <Sidebar v-bind="sidebarState" :sidebar-menu="sidebarMenu" />
</template>
