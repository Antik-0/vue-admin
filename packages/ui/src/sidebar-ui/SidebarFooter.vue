<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '#/utils'

interface Props {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
</script>

<template>
  <div
    :class="cn('flex flex-col gap-2 p-2', props.class)"
    data-sidebar="footer"
  >
    <slot></slot>
  </div>
</template>
