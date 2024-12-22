<script setup lang="ts">
import {
  type DropdownMenuSeparatorProps,
  DropdownMenuSeparator,
} from 'radix-vue'
import { type HTMLAttributes, computed } from 'vue'
import { cn } from '#/utils'

const props = defineProps<
  {
    class?: HTMLAttributes['class']
  } & DropdownMenuSeparatorProps
>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})
</script>

<template>
  <DropdownMenuSeparator
    v-bind="delegatedProps"
    :class="cn('-mx-1 my-1 h-px bg-muted', props.class)"
  />
</template>
