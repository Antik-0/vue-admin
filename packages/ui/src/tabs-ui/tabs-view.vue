<script setup lang="ts">
import TabsChrome from './tabs-chrome.vue'

defineOptions({
  name: 'TabsView',
})
</script>

<template>
  <div class="flex flex-1 px-5 h-full overflow-hidden">
    <TabsChrome />
  </div>
</template>
