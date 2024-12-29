<script setup lang="ts">
import { type Component, computed } from 'vue'
import { createIcon } from '@repo/icons'
import { isComponent } from '@repo/utils'

interface Props {
  icon?: string | Component
}

defineOptions({
  name: 'UIIcon',
})

const props = defineProps<Props>()

const iconRender = computed(() => {
  const { icon } = props
  if (!icon) return null
  return isComponent(icon) ? icon : createIcon(icon)
})
</script>

<template>
  <component :is="iconRender" />
</template>
