import type { Ref } from 'vue'

type Collapsible = 'icon' | 'none' | 'offcanvas'

interface SiderbarState {
  /**
   * sidebar当前的状态
   */
  state: Ref<'expanded' | Collapsible>
  /**
   * sidebar是否打开
   */
  open: Ref<boolean>
  /**
   * 打开sidebar
   */
  setOpen: (open: boolean) => void
  /**
   * 切换sidebar
   */
  toggleSidebar: () => void
}

export type { SiderbarState }
