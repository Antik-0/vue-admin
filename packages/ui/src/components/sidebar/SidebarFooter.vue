<script setup lang="ts">
import type { HtmlHTMLAttributes } from 'vue'
import { cn } from '#/utils'

interface Props {
  class?: HtmlHTMLAttributes['class']
}

const props = defineProps<Props>()
</script>

<template>
  <div
    :class="cn('flex flex-col gap-2 p-2', props.class)"
    data-sidebar="footer"
  ></div>
</template>
