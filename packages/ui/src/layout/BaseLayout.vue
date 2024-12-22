<script setup lang="ts">
import { LayoutFooter } from './footer'
import { LayoutHeader } from './header'
import { LayoutMain } from './main'
</script>

<template>
  <div class="relative min-h-full w-full flex">
    <div
      class="flex flex-1 flex-col overflow-hidden transition-all duration-300 ease-in"
    >
      <LayoutHeader />
      <LayoutMain />
      <LayoutFooter />
    </div>
  </div>
</template>
