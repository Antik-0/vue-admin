<script setup lang="ts">
import { type ContextMenuGroupProps, ContextMenuGroup } from 'radix-vue'

const props = defineProps<ContextMenuGroupProps>()
</script>

<template>
  <ContextMenuGroup v-bind="props">
    <slot></slot>
  </ContextMenuGroup>
</template>
