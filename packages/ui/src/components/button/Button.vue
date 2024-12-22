<script setup lang="ts">
import type { ButtonProps } from './index'
import { computed } from 'vue'
import { LoaderCircle } from '#/icons'
import { Button as SdButton } from '#/shadcn-ui'

interface Props extends ButtonProps {}

defineOptions({ name: 'AzButton' })

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
  <SdButton
    :class="props.class"
    :disabled="isDisabled"
    :size="props.size"
    :variant="props.variant"
    as="button"
    type="button"
  >
    <LoaderCircle
      v-if="loading"
      class="text-md mr-2 size-4 flex-shrink-0 animate-spin"
    />
    <slot></slot>
  </SdButton>
</template>
