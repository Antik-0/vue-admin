<script setup lang="ts">
import { computed } from 'vue'
import { type RouterLinkProps, RouterLink } from 'vue-router'

interface Props extends RouterLinkProps {
  inactiveClass?: string
}

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<Props>(), {
  inactiveClass: '',
})

const isExternalLink = computed(() => {
  return typeof props.to === 'string' && props.to.startsWith('http')
})
</script>

<template>
  <a v-if="isExternalLink" v-bind="$attrs" :href="to as string" target="_blank">
    <slot></slot>
  </a>
  <RouterLink
    v-else
    v-slot="{ isActive, href, navigate }"
    v-bind="$props"
    custom
  >
    <a
      v-bind="$attrs"
      :class="isActive ? activeClass : inactiveClass"
      :href="href"
      @click="navigate"
    >
      <slot></slot>
    </a>
  </RouterLink>
</template>
