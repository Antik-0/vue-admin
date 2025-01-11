<script setup lang="ts">
import { ref } from 'vue'
import { IconButton } from '#/components/button'
import { IconMaximize, IconMinimize } from '@repo/icons'

const isFullScreen = ref(false)

function toggle() {
  isFullScreen.value = !isFullScreen.value
}
</script>

<template>
  <IconButton class="rounded-full" @click="toggle">
    <IconMinimize v-if="isFullScreen" />
    <IconMaximize v-else />
  </IconButton>
</template>
