<script setup lang="ts">
import {
  type ContextMenuSubEmits,
  type ContextMenuSubProps,
  ContextMenuSub,
  useForwardPropsEmits,
} from 'radix-vue'

const props = defineProps<ContextMenuSubProps>()
const emits = defineEmits<ContextMenuSubEmits>()

const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
  <ContextMenuSub v-bind="forwarded">
    <slot></slot>
  </ContextMenuSub>
</template>
