<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { ScrollArea } from '#/shadcn-ui'
import { cn } from '#/utils'

interface Props {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
</script>

<template>
  <div :class="cn('flex-1', props.class)" data-sidebar="content">
    <ScrollArea class="h-full">
      <slot></slot>
    </ScrollArea>
  </div>
</template>
