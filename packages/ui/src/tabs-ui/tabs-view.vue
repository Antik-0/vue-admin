<script setup lang="ts">
import TabsChrome from './tabs-chrome.vue'

defineOptions({
  name: 'TabsView',
})
</script>

<template>
  <div class="flex flex-1 overflow-hidden h-full">
    <div class="pt-3px flex-1 overflow-hidden size-full">
      <TabsChrome />
    </div>
  </div>
</template>
