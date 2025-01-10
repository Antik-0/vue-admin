<script setup lang="ts">
import type { Component } from 'vue'
import type { ButtonProps } from './index'

import { computed, useAttrs } from 'vue'
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
  variant: 'outline',
})

const bindProps = computed(() => {
  const { loading: _loading, size: _size, ...attrs } = useAttrs()
  return { ...props, ...attrs }
})

const iconRender = computed(() => {
  const { icon } = props
  if (!icon) return null
  return isComponent(icon) ? icon : createIcon(icon)
})
</script>

<template>
  <UIButton v-bind="bindProps" :loading="false" size="icon">
    <slot>
      <component :is="iconRender" v-if="props.icon" />
    </slot>
  </UIButton>
</template>
