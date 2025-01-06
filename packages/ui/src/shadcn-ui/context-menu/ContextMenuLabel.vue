<script setup lang="ts">
import { type ContextMenuLabelProps, ContextMenuLabel } from 'radix-vue'
import { type HTMLAttributes, computed } from 'vue'
import { cn } from '#/utils'

const props = defineProps<
  { class?: HTMLAttributes['class']; inset?: boolean } & ContextMenuLabelProps
>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})
</script>

<template>
  <ContextMenuLabel
    v-bind="delegatedProps"
    :class="
      cn(
        'px-2 py-1.5 text-sm font-semibold text-foreground',
        inset && 'pl-8',
        props.class
      )
    "
  >
    <slot></slot>
  </ContextMenuLabel>
</template>
