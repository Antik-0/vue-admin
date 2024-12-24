import type { BaseLayoutProps, LayoutType } from '../base-layout.ts'

import { computed } from 'vue'

export function useLayout(props: BaseLayoutProps) {
  const currentLayout = computed(() =>
    props.isMobile ? 'sidebar-nav' : (props.layout as LayoutType)
  )

  const isFullContent = computed(() => currentLayout.value === 'full-content')

  const isHeaderNav = computed(() => currentLayout.value === 'header-nav')

  return {
    currentLayout,
    isFullContent,
    isHeaderNav,
  }
}
