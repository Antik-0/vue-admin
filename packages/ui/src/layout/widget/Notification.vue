<script lang="ts" setup>
import { UIIconButton } from '#/components'
import { IconBell } from '@repo/icons'
</script>

<template>
  <UIIconButton class="bell-button rounded-full">
    <IconBell />
  </UIIconButton>
</template>

<style scoped>
.bell-button:hover svg {
  animation: bell-ring 1s both;
}

@keyframes bell-ring {
  0%,
  100% {
    transform-origin: top;
  }

  15% {
    transform: rotateZ(10deg);
  }

  30% {
    transform: rotateZ(-10deg);
  }

  45% {
    transform: rotateZ(5deg);
  }

  60% {
    transform: rotateZ(-5deg);
  }

  75% {
    transform: rotateZ(2deg);
  }
}
</style>
