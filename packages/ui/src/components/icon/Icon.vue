<script setup lang="ts">
import { type Component, computed } from 'vue'
import { createIcon } from '@repo/icons'
import { isFunction, isObject, isString } from '@repo/utils'

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
  const isComponent = !isString(icon) && (isObject(icon) || isFunction(icon))
  return isComponent ? icon : createIcon(icon)
})
</script>

<template>
  <component :is="iconRender" />
</template>
