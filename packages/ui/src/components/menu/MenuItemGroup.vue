<script setup lang="ts">
import { type StyleValue, computed } from 'vue'
import { useMenu } from './use-menu'

interface Props {
  title?: string
}

defineProps<Props>()

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
      :style="groupLabelStyle"
      class="h-8 w-full flex items-center px-2 text-sm text-sidebar-foreground/70 font-medium"
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
