<script setup lang="ts">
import { Primitive } from 'radix-vue'
import { useSidebar } from './use-sidebar'

interface Props {
  type?: 'collapse' | 'floating' | 'offcanvas'
}

const props = withDefaults(defineProps<Props>(), {
  type: 'collapse',
})

const {
  collapse,
  floating,
  offcanvas,
  toggleCollapse,
  toggleFloating,
  toggleOpenState,
} = useSidebar()

function handleTrigger() {
  if (props.type === 'collapse') {
    toggleCollapse()
  } else if (props.type === 'floating') {
    toggleFloating()
  } else if (props.type === 'offcanvas') {
    toggleOpenState()
  }
}
</script>

<template>
  <Primitive data-sidebar="trigger" as-child @click="handleTrigger">
    <slot v-bind="{ offcanvas, collapse, floating }"></slot>
  </Primitive>
</template>
