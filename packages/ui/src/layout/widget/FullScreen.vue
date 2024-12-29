<script setup lang="ts">
import { ref } from 'vue'
import { UIIconButton } from '#/components/button'
import { IconMaximize, IconMinimize } from '@repo/icons'

const isFullScreen = ref(false)

function toggle() {
  isFullScreen.value = !isFullScreen.value
}
</script>

<template>
  <UIIconButton class="rounded-full" @click="toggle">
    <IconMinimize v-if="isFullScreen" />
    <IconMaximize v-else />
  </UIIconButton>
</template>
