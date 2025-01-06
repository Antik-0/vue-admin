<script setup lang="ts">
import {
  type ContextMenuSubTriggerProps,
  ContextMenuSubTrigger,
  useForwardProps,
} from 'radix-vue'
import { type HTMLAttributes, computed } from 'vue'
import { cn } from '#/utils'
import { IconChevronRight } from '@repo/icons'

const props = defineProps<
  {
    class?: HTMLAttributes['class']
    inset?: boolean
  } & ContextMenuSubTriggerProps
>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <ContextMenuSubTrigger
    v-bind="forwardedProps"
    :class="
      cn(
        'flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground',
        inset && 'pl-8',
        props.class
      )
    "
  >
    <slot></slot>
    <IconChevronRight class="ml-auto h-4 w-4" />
  </ContextMenuSubTrigger>
</template>
