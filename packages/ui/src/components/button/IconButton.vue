<script setup lang="ts">
import type { Component } from 'vue'
import type { ButtonProps } from './index'
import { Icon } from '#/icons'
import { Button as UIButton } from '#/shadcn-ui/button'

interface Props extends Omit<ButtonProps, 'loading' | 'size'> {
  icon?: string | Component
}

const props = withDefaults(defineProps<Props>(), {
  class: '',
  disabled: false,
  icon: undefined,
  variant: 'outline',
})
</script>

<template>
  <UIButton
    as="button"
    :class="props.class"
    :disabled="disabled"
    size="icon"
    type="button"
    :variant="variant"
  >
    <slot>
      <Icon :icon="props.icon" />
    </slot>
  </UIButton>
</template>
