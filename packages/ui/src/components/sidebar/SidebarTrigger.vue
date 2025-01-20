<script setup lang="ts">
import { computed } from 'vue'
import { IconPanelLeft, IconPanelLeftOpen } from '#/icons'
import { useSidebar } from '#/shadcn-ui/sidebar'
import { IconButton } from '../button'

const { state, toggleSidebar } = useSidebar()

const isCollapsed = computed(() => state.value === 'collapsed')
</script>

<template>
  <IconButton
    :icon="isCollapsed ? IconPanelLeftOpen : IconPanelLeft"
    data-sidebar="trigger"
    variant="ghost"
    @click="toggleSidebar"
  />
</template>
