<script setup lang="ts">
import type { ButtonProps } from './index'
import { computed } from 'vue'
import { IconLoading } from '#/icons'
import { Button } from '#/shadcn-ui/button'

interface Props extends ButtonProps {}

defineOptions({ name: 'UIButton' })

const props = withDefaults(defineProps<Props>(), {
  class: '',
  disabled: false,
  loading: false,
  size: 'default',
  variant: 'default',
})

const isDisabled = computed(() => props.disabled || props.loading)
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
    <IconLoading v-if="loading" />
    <slot></slot>
  </Button>
</template>
