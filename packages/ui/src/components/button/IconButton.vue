<script setup lang="ts">
import type { Component } from 'vue'
import type { ButtonProps } from './props'

import UIButton from './Button.vue'

interface Props extends Omit<ButtonProps, 'loading' | 'size'> {
  icon?: Component
}

defineOptions({ name: 'UIIconButton' })

const props = withDefaults(defineProps<Props>(), {
  class: '',
  disabled: false,
  icon: undefined,
  variant: 'ghost',
})
</script>

<template>
  <UIButton v-bind="props" size="icon">
    <slot><component :is="props.icon" v-if="props.icon" /></slot>
  </UIButton>
</template>
