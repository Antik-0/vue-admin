<script setup lang="ts">
import type { RendererElement } from 'vue'

const reset = (el: RendererElement) => {
  el.style.maxHeight = ''
  el.style.overflow = el.dataset.elOverflow || ''
}

const on = {
  beforeEnter: (el: RendererElement) => {
    if (el.style.height) {
      el.dataset.elHeight = el.style.height
    }
    if (el.style.overflow) {
      el.dataset.elOverflow = el.style.overflow
    }
    el.style.maxHeight = 0
  },

  enter: (el: RendererElement) => {
    requestAnimationFrame(() => {
      if (el.dataset.elHeight) {
        el.style.maxHeight = el.dataset.elHeight
      } else if (el.scrollHeight !== 0) {
        el.style.maxHeight = `${el.scrollHeight}px`
      } else {
        el.style.maxHeight = 0
      }
      el.style.overflow = 'hidden'
    })
  },

  afterEnter: (el: RendererElement) => {
    reset(el)
  },

  enterCancelled: (el: RendererElement) => {
    reset(el)
  },

  beforeLeave: (el: RendererElement) => {
    if (el.style.overflow) {
      el.dataset.elOverflow = el.style.overflow
    }
    el.style.maxHeight = `${el.scrollHeight}px`
    el.style.overflow = 'hidden'
  },

  leave: (el: RendererElement) => {
    el.style.maxHeight = 0
  },

  afterLeave: (el: RendererElement) => {
    reset(el)
  },

  leaveCancelled: (el: RendererElement) => {
    reset(el)
  },
}
</script>

<template>
  <Transition name="collapse" v-on="on">
    <slot></slot>
  </Transition>
</template>
