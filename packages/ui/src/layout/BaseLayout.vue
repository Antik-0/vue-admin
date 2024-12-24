<script setup lang="ts">
import type { BaseLayoutProps } from './base-layout'
import { computed } from 'vue'
import { LayoutFooter } from './footer'
import { LayoutHeader } from './header'
import { useLayout } from './hooks/use-layout'
import { LayoutMain } from './main'

interface Props extends BaseLayoutProps {}

defineOptions({
  name: 'BaseLayout',
})

const props = withDefaults(defineProps<Props>(), {
  contentCompact: 'wide',
  contentCompactWidth: 1200,
  contentPadding: 0,
  contentPaddingBottom: 0,
  contentPaddingLeft: 0,
  contentPaddingRight: 0,
  contentPaddingTop: 0,
  footerEnable: false,
  footerFixed: true,
  footerHeight: 32,
  headerHeight: 50,
  headerHidden: false,
  headerMode: 'fixed',
  headerToggleSidebarButton: true,
  headerVisible: true,
  isMobile: false,
  layout: 'sidebar-nav',
  sidebarCollapseShowTitle: false,
  sidebarExtraCollapsedWidth: 60,
  sidebarHidden: false,
  sidebarMixedWidth: 80,
  sidebarTheme: 'dark',
  sidebarWidth: 180,
  sideCollapseWidth: 60,
  tabbarEnable: true,
  tabbarHeight: 40,
  zIndex: 200,
})

const { currentLayout, isFullContent } = useLayout(props)

const isSideMode = computed(() => currentLayout.value === 'sidebar-nav')

const mainStyle = computed(() => {
  let width = '100%'
  let sidebarAndExtraWidth = 'unset'
  return {
    sidebarAndExtraWidth,
    width,
  }
})
</script>

<template>
  <div class="relative min-h-full w-full flex">
    <div
      class="flex flex-1 flex-col overflow-hidden transition-all duration-300 ease-in"
    >
      <LayoutHeader
        v-if="headerVisible"
        :full-width="!isSideMode"
        :height="headerHeight"
        :is-mobile="isMobile"
        :show="!isFullContent && !headerHidden"
        :sidebar-width="sidebarWidth"
        :theme="headerTheme"
        :width="mainStyle.width"
        :z-index="zIndex"
      />
      <LayoutMain />
      <LayoutFooter />
    </div>
  </div>
</template>
