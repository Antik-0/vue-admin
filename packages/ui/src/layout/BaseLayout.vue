<script setup lang="ts">
import type { BaseLayoutProps } from './base-layout'
import { computed, ref } from 'vue'
import { useLayout } from './hooks/use-layout'

import LayoutContent from './LayoutContent.vue'
import LayoutHeader from './LayoutHeader.vue'
import LayoutSidebar from './LayoutSidebar.vue'
import LayoutTabsbar from './LayoutTabsbar.vue'

import { Breadcrumb } from '#/components/breadcrumb'

interface Props extends BaseLayoutProps {
  logoImage?: string
  logoTitle?: string
}

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

const breadcrumbs = ref([
  { path: '2', icon: 'logos:react', title: '面包屑:react' },
  {
    path: '1',
    icon: 'logos:vue',
    items: [
      { path: '1', icon: 'logos:vue', title: '面包屑:vue' },
      { path: '2', icon: 'logos:react', title: '面包屑:react' },
    ],
    title: '面包屑:vue',
  },
])
</script>

<template>
  <div class="relative min-h-full w-full flex">
    <LayoutSidebar :logo-image="logoImage" :logo-title="logoTitle" />
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
      >
        <template #breadcrumb>
          <slot name="breadcrumb">
            <div class="px-4">
              <Breadcrumb :breadcrumbs="breadcrumbs" show-icon />
            </div>
          </slot>
        </template>
      </LayoutHeader>
      <LayoutTabsbar :height="38" />
      <LayoutContent />
    </div>
  </div>
</template>
