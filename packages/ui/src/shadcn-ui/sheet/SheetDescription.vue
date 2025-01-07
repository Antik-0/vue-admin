<script setup lang="ts">
import { type DialogDescriptionProps, DialogDescription } from 'radix-vue'
import { type HTMLAttributes, computed } from 'vue'
import { cn } from '#/utils'

const props = defineProps<
  { class?: HTMLAttributes['class'] } & DialogDescriptionProps
>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})
</script>

<template>
  <DialogDescription
    :class="cn('text-sm text-muted-foreground', props.class)"
    v-bind="delegatedProps"
  >
    <slot></slot>
  </DialogDescription>
</template>
