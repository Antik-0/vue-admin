<script setup lang="ts">
import type { Component } from 'vue'
import type { ButtonProps } from './index'
import AzButton from './Button.vue'

interface Props extends Omit<ButtonProps, 'loading' | 'size'> {
  icon?: Component
}

defineOptions({ name: 'AzIconButton' })

const props = withDefaults(defineProps<Props>(), {
  class: '',
  disabled: false,
  icon: undefined,
  variant: 'ghost',
})
</script>

<template>
  <AzButton v-bind="props" size="icon">
    <slot><component :is="props.icon" v-if="props.icon" /></slot>
  </AzButton>
</template>
