<script setup lang="ts">
import type { ButtonProps } from './index'

import { computed } from 'vue'
import { IconLoaderCircle } from '#/icons'
import { Button } from '#/shadcn-ui'

interface Props extends ButtonProps {}

defineOptions({ name: 'UIButton' })

const props = withDefaults(defineProps<Props>(), {
  class: '',
  disabled: false,
  loading: false,
  size: 'default',
  variant: 'default',
})

const isDisabled = computed(() => {
  return props.disabled || props.loading
})
</script>

<template>
  <Button
    :class="props.class"
    :disabled="isDisabled"
    :size="size"
    :variant="variant"
    as="button"
    type="button"
  >
    <slot name="loading">
      <IconLoaderCircle v-if="loading" class="animate-spin" />
    </slot>
    <slot></slot>
  </Button>
</template>
