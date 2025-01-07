<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '#/utils'
import { Separator } from '../separator'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <Separator
    :class="cn('mx-2 w-auto bg-sidebar-border', props.class)"
    data-sidebar="separator"
  >
    <slot></slot>
  </Separator>
</template>
