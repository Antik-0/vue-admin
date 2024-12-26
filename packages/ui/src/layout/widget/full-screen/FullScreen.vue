<script setup lang="ts">
import { ref } from 'vue'
import { UIIconButton } from '#/components/button'
import { LucideMaximize, LucideMinimize } from '@repo/icons'

const isFullScreen = ref(false)

function toggle() {
  isFullScreen.value = !isFullScreen.value
}
</script>

<template>
  <UIIconButton class="rounded-full" @click="toggle">
    <LucideMinimize v-if="isFullScreen" class="size-5" />
    <LucideMaximize v-else class="size-5" />
  </UIIconButton>
</template>
