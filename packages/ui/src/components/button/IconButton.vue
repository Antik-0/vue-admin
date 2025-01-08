<script setup lang="ts">
import type { Component } from 'vue'
import type { ButtonProps } from './index'

import { computed } from 'vue'
import { createIcon } from '@repo/icons'
import { isComponent } from '@repo/utils'
import UIButton from './Button.vue'

interface Props extends Omit<ButtonProps, 'loading' | 'size'> {
  icon?: string | Component
}

defineOptions({ name: 'UIIconButton' })

const props = withDefaults(defineProps<Props>(), {
  class: '',
  disabled: false,
  icon: undefined,
  variant: 'ghost',
})

const iconRender = computed(() => {
  const { icon } = props
  if (!icon) return null
  return isComponent(icon) ? icon : createIcon(icon)
})
</script>

<template>
  <UIButton v-bind="props" size="icon">
    <slot>
      <component :is="iconRender" v-if="props.icon" />
    </slot>
  </UIButton>
</template>
