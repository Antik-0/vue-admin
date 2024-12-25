<script setup lang="ts">
import type { ButtonProps } from './props'

import { computed } from 'vue'
import { LucideLoaderCircle } from '#/icons'
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
    :size="props.size"
    :variant="props.variant"
    as="button"
    type="button"
  >
    <LucideLoaderCircle
      v-if="loading"
      class="text-md mr-2 size-4 flex-shrink-0 animate-spin"
    />
    <slot></slot>
  </Button>
</template>
