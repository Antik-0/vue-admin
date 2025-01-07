<script setup lang="ts">
import { type DialogTitleProps, DialogTitle } from 'radix-vue'
import { type HTMLAttributes, computed } from 'vue'
import { cn } from '#/utils'

const props = defineProps<
  { class?: HTMLAttributes['class'] } & DialogTitleProps
>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})
</script>

<template>
  <DialogTitle
    :class="cn('text-lg font-semibold text-foreground', props.class)"
    v-bind="delegatedProps"
  >
    <slot></slot>
  </DialogTitle>
</template>
