<script setup lang="ts">
import {
  type DropdownMenuSubTriggerProps,
  DropdownMenuSubTrigger,
  useForwardProps,
} from 'radix-vue'
import { type HTMLAttributes, computed } from 'vue'
import { LucideChevronRight } from '#/icons'
import { cn } from '#/utils'

const props = defineProps<
  { class?: HTMLAttributes['class'] } & DropdownMenuSubTriggerProps
>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <DropdownMenuSubTrigger
    v-bind="forwardedProps"
    :class="
      cn(
        'flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent',
        props.class
      )
    "
  >
    <slot></slot>
    <LucideChevronRight class="ml-auto h-4 w-4" />
  </DropdownMenuSubTrigger>
</template>
