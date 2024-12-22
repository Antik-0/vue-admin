<script setup lang="ts">
import {
  type DropdownMenuLabelProps,
  DropdownMenuLabel,
  useForwardProps,
} from 'radix-vue'
import { type HTMLAttributes, computed } from 'vue'
import { cn } from '#/utils'

const props = defineProps<
  { class?: HTMLAttributes['class']; inset?: boolean } & DropdownMenuLabelProps
>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <DropdownMenuLabel
    v-bind="forwardedProps"
    :class="
      cn('px-2 py-1.5 text-sm font-semibold', inset && 'pl-8', props.class)
    "
  >
    <slot></slot>
  </DropdownMenuLabel>
</template>
