<script setup lang="ts">
import {
  type DropdownMenuCheckboxItemEmits,
  type DropdownMenuCheckboxItemProps,
  DropdownMenuCheckboxItem,
  DropdownMenuItemIndicator,
  useForwardPropsEmits,
} from 'radix-vue'
import { type HTMLAttributes, computed } from 'vue'
import { IconCheck } from '#/icons'
import { cn } from '#/utils'

const props = defineProps<
  { class?: HTMLAttributes['class'] } & DropdownMenuCheckboxItemProps
>()
const emits = defineEmits<DropdownMenuCheckboxItemEmits>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <DropdownMenuCheckboxItem
    v-bind="forwarded"
    :class="
      cn(
        'relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        props.class
      )
    "
  >
    <span class="absolute left-2 h-3.5 w-3.5 flex items-center justify-center">
      <DropdownMenuItemIndicator>
        <IconCheck class="h-4 w-4" />
      </DropdownMenuItemIndicator>
    </span>
    <slot></slot>
  </DropdownMenuCheckboxItem>
</template>
