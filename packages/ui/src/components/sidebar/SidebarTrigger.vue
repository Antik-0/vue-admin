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
    data-sidebar="trigger"
    :icon="isCollapsed ? IconPanelLeftOpen : IconPanelLeft"
    variant="ghost"
    @click="toggleSidebar"
  />
</template>
