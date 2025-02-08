<script setup lang="ts">
import type { CSSProperties } from 'vue'
import { computed } from 'vue'
import { TabsView } from '#/tabs-ui'

interface Props {
  height: number
}

const props = withDefaults(defineProps<Props>(), {
  height: 48,
})

const style = computed((): CSSProperties => {
  return {
    height: `${props.height}px`,
  }
})
</script>

<template>
  <section
    class="w-full flex border-b border-border bg-background transition-all"
    :style="style"
  >
    <slot>
      <TabsView />
    </slot>
  </section>
</template>
