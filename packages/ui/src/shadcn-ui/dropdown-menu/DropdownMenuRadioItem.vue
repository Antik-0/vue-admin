<script setup lang="ts">
import {
  type DropdownMenuRadioItemEmits,
  type DropdownMenuRadioItemProps,
  DropdownMenuItemIndicator,
  DropdownMenuRadioItem,
  useForwardPropsEmits,
} from 'radix-vue'
import { type HTMLAttributes, computed } from 'vue'
import { LucideCircle } from '#/icons'
import { cn } from '#/utils'

const props = defineProps<
  { class?: HTMLAttributes['class'] } & DropdownMenuRadioItemProps
>()

const emits = defineEmits<DropdownMenuRadioItemEmits>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <DropdownMenuRadioItem
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
        <LucideCircle class="h-2 w-2 fill-current" />
      </DropdownMenuItemIndicator>
    </span>
    <slot></slot>
  </DropdownMenuRadioItem>
</template>
