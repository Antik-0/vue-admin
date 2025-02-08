import type { ComputedRef, EffectScope, Ref } from 'vue'
import { useMediaQuery } from '@vueuse/core'
import { effectScope, ref } from 'vue'

interface SidebarContext {
  /**
   * 侧边栏折叠状态
   */
  collapse: Ref<boolean>
  /**
   * 侧边栏悬浮状态
   */
  floating: Ref<boolean>
  /**
   * 侧边栏离屏状态
   */
  offcanvas: Ref<boolean>
  /**
   * 是否是移动端
   */
  isMobile: ComputedRef<boolean>
  /**
   * 切换折叠状态
   */
  toggleCollapse: () => void
  /**
   * 切换悬浮状态
   */
  toggleFloating: () => void
  /**
   * 切换打开状态
   */
  toggleOpenState: () => void
}

function createSidebarContext() {
  const collapse = ref(false)
  const floating = ref(false)
  const offcanvas = ref(false)

  const isMobile = useMediaQuery('(max-width: 768px)')

  function toggleCollapse() {
    if (isMobile.value) return
    collapse.value = !collapse.value
  }

  function toggleFloating() {
    if (isMobile.value) return
    floating.value = !floating.value
  }

  function toggleOpenState() {
    offcanvas.value = !offcanvas.value
  }

  return {
    collapse,
    floating,
    isMobile,
    offcanvas,
    toggleCollapse,
    toggleFloating,
    toggleOpenState,
  }
}

function createSharedSidebar() {
  let sidebarContext: SidebarContext | null = null
  let sidebarScope: EffectScope | null = null

  return () => {
    if (!sidebarScope) {
      sidebarScope = effectScope()
      sidebarContext = sidebarScope.run(createSidebarContext)!
    }
    return sidebarContext!
  }
}

export const useSidebar = createSharedSidebar()
