<script lang="ts" setup>
import type { HTMLAttributes } from 'vue'
import { IconChevronRight } from '#/icons'
import { cn } from '#/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <li
    :class="cn('[&>svg]:w-3.5 [&>svg]:h-3.5', props.class)"
    aria-hidden="true"
    role="presentation"
  >
    <slot>
      <IconChevronRight />
    </slot>
  </li>
</template>
