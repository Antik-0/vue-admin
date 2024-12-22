import type { MenuState } from '@core/types'

import { effectScope, ref } from 'vue'
import { useRouter } from 'vue-router'
import { createMenuRecord } from './createMenu.ts'

const ERROR_TEXT = 'useMenu must be run within the scope of router-view'

/**
 * 创建共享的菜单作用域
 */
function createMenuScope() {
  let menuState: MenuState | null = null
  const scope = effectScope(true)

  function createState() {
    const router = useRouter()
    if (!router) {
      throw new Error(ERROR_TEXT)
    }

    const menu = ref(createMenuRecord(router))
    return { menu }
  }

  return () => {
    if (!menuState) {
      menuState = scope.run(createState)!
    }
    return menuState
  }
}

const useMenu = createMenuScope()

export { useMenu }
