<script setup lang="ts">
import type { MenuItemGroupProps, StyleValue } from './types'
import { computed } from 'vue'
import { useMenu } from './use-menu'

defineProps<MenuItemGroupProps>()

const { levelOffsetCssVar } = useMenu()

const groupLabelStyle = computed<StyleValue>(() => {
  return {
    paddingLeft: levelOffsetCssVar,
  }
})
</script>

<template>
  <div class="py-2">
    <div
      class="h-8 w-full flex items-center px-2 text-sm text-sidebar-foreground/70 font-medium"
      :style="groupLabelStyle"
    >
      <slot name="title">
        <span v-if="title">{{ title }}</span>
      </slot>
    </div>

    <ol class="flex flex-col list-none gap-2" role="menu">
      <slot></slot>
    </ol>
  </div>
</template>
