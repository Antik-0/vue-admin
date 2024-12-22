import type { SiderbarState } from '@core/types'

import { effectScope, ref } from 'vue'

function createSidebarScope() {
  let sidebarState: SiderbarState | null = null
  const scope = effectScope(true)

  function createState() {
    const state: SiderbarState['state'] = ref('expanded')
    const open = ref(false)

    const setOpen = (value: boolean) => {
      open.value = value
    }

    function toggleSidebar() {
      open.value = !open.value
    }

    return { open, setOpen, state, toggleSidebar }
  }

  return () => {
    if (!sidebarState) {
      sidebarState = scope.run(createState)!
    }
    return sidebarState
  }
}

const useSidebar = createSidebarScope()

export { useSidebar }
