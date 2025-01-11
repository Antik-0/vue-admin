<script setup lang="ts">
import TabsChrome from './tabs-chrome.vue'

defineOptions({
  name: 'TabsView',
})
</script>

<template>
  <div class="h-full flex flex-1 overflow-hidden rounded-md px-5">
    <TabsChrome />
  </div>
</template>
