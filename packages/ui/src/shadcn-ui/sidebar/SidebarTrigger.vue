<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { IconMenu } from '#/icons'
import { cn } from '#/utils'
import { Button } from '../button'
import { useSidebar } from './utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()

const { toggleSidebar } = useSidebar()
</script>

<template>
  <Button
    :class="cn('h-7 w-7', props.class)"
    data-sidebar="trigger"
    size="icon"
    variant="ghost"
    @click="toggleSidebar"
  >
    <IconMenu />
    <span class="sr-only">Toggle Sidebar</span>
  </Button>
</template>
