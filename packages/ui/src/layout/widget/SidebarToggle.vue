<script setup lang="ts">
import { ref } from 'vue'
import { UIIconButton } from '#/components/button'
import { IconChevronRight, IconChevronsLeft } from '@repo/icons'

const collapsed = ref(false)
</script>

<template>
  <UIIconButton class="rounded-full">
    <IconChevronRight v-if="collapsed" />
    <IconChevronsLeft v-else />
  </UIIconButton>
</template>
