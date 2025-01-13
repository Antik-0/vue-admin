<script setup lang="ts">
import {
  type ScrollAreaRootProps,
  ScrollAreaCorner,
  ScrollAreaRoot,
  ScrollAreaViewport,
} from 'radix-vue'
import { type HTMLAttributes, computed } from 'vue'
import { cn } from '#/utils'
import ScrollBar from './ScrollBar.vue'

const props = defineProps<
  { class?: HTMLAttributes['class'] } & ScrollAreaRootProps
>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})
</script>

<template>
  <ScrollAreaRoot
    v-bind="delegatedProps"
    :class="cn('relative overflow-hidden', props.class)"
  >
    <ScrollAreaViewport class="h-full w-full rounded-[inherit]">
      <slot></slot>
    </ScrollAreaViewport>
    <ScrollBar />
    <ScrollAreaCorner />
  </ScrollAreaRoot>
</template>
