<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { type PrimitiveProps, Primitive } from 'radix-vue'
import { cn } from '#/utils'
import { type ButtonVariants, buttonVariants } from './index'

interface Props extends PrimitiveProps {
  class?: HTMLAttributes['class']
  size?: ButtonVariants['size']
  variant?: ButtonVariants['variant']
}

const props = withDefaults(defineProps<Props>(), {
  as: 'button',
})
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    :class="cn(buttonVariants({ variant, size }), props.class)"
  >
    <slot></slot>
  </Primitive>
</template>
