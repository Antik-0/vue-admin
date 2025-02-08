<script setup lang="ts">
import type { HTMLAttributes, StyleValue } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { computed, reactive, shallowRef, watchEffect } from 'vue'
import { cn } from '#/utils'
import { useSidebar } from './use-sidebar'

interface Props {
  class?: HTMLAttributes['class']
}

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<Props>(), {
  class: '',
})

const { collapse, floating, isMobile, offcanvas } = useSidebar()

watchEffect(() => {
  // 切换到移动端，展开侧边栏
  if (isMobile.value) {
    collapse.value = false
  }
  // 切换到悬浮状态，折叠侧边栏
  if (floating.value) {
    collapse.value = true
  }
})

const sidebarCssVar = reactive({
  duration: '0.4s',
  easefunc: 'ease-in-out',
  width: '260px',
  widthIcon: '56px',
})

const sidebarProviderStyle = computed<StyleValue>(() => {
  return {
    '--sidebar-duration': sidebarCssVar.duration,
    '--sidebar-easefunc': sidebarCssVar.easefunc,
    '--sidebar-width': sidebarCssVar.width,
    '--sidebar-width-icon': sidebarCssVar.widthIcon,
  }
})

const skeletonStyle = computed<StyleValue>(() => {
  if (isMobile.value || offcanvas.value) {
    return { width: '0' }
  }
  if (floating.value || collapse.value) {
    return { width: 'var(--sidebar-width-icon)' }
  }
  return null
})

const sidebarElement = shallowRef<HTMLDivElement>()

onClickOutside(sidebarElement, () => {
  if (!isMobile.value) return
  if (offcanvas.value === false) {
    offcanvas.value = true
  }
})

function onMouseenter() {
  if (isMobile.value || !floating.value) return
  collapse.value = false
}

function onMouseleave() {
  if (isMobile.value || !floating.value) return
  collapse.value = true
}
</script>

<template>
  <div
    class="group"
    :data-collapsed="collapse"
    :data-floating="floating"
    :data-offcanvas="offcanvas"
    data-sidebar="provider"
    :style="sidebarProviderStyle"
    @mouseenter="onMouseenter"
    @mouseleave="onMouseleave"
  >
    <div
      class="h-100% w-[--sidebar-width] transition-[width] duration-[--sidebar-duration] ease-[--sidebar-easefunc] min-h-svh"
      data-sidebar="skeleton"
      :style="skeletonStyle"
    ></div>
    <div
      v-if="isMobile"
      class="fixed inset-0 z-90 bg-black/50 data-[state=close]:hidden"
      data-sidebar="overlay"
      :data-state="offcanvas ? 'close' : 'open'"
    ></div>
    <aside
      ref="sidebarElement"
      :class="
        cn(
          'fixed inset-y-0 left-0 z-100 w-[--sidebar-width] bg-sidebar-background text-sidebar-foreground shadow-[1px_0_1px_0_hsl(var(--border))] transition-[width,transform] duration-[--sidebar-duration] ease-[--sidebar-easefunc] group-data-[collapsed=true]:w-[--sidebar-width-icon] group-data-[offcanvas=true]:translate-x-[-100%]',
          props.class
        )
      "
      v-bind="$attrs"
      data-sidebar="sidebar"
    >
      <div class="h-full flex flex-col">
        <slot></slot>
      </div>
    </aside>
  </div>
</template>
