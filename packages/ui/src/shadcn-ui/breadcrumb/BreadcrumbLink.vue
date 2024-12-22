<script lang="ts" setup>
import type { HTMLAttributes } from 'vue'
import { type PrimitiveProps, Primitive } from 'radix-vue'
import { cn } from '#/utils'

const props = withDefaults(
  defineProps<{ class?: HTMLAttributes['class'] } & PrimitiveProps>(),
  { as: 'a' }
)
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    :class="cn('transition-colors hover:text-foreground', props.class)"
  >
    <slot></slot>
  </Primitive>
</template>
