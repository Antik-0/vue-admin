import type { MenuProps } from './types.ts'
import { reactive, ref, watch } from 'vue'

export const useMenu = (props: MenuProps) => {
  /**
   * menu css vars
   */
  const menuCssVar = reactive({
    '--menu-level': '0',
    '--menu-level-padding': '24px',
  })

  /**
   * menu title padding left css var
   */
  const levelOffsetCssVar = `calc(8px + var(--menu-level, 0) * var(--menu-level-padding))`

  /**
   * active menuItem and menuSub
   */
  const activeIndex = ref<string>(props.defaultIndex ?? '')
  const activeMenus = ref<string[]>([])

  watch(
    () => props.defaultIndex,
    val => {
      activeIndex.value = val ?? ''
    }
  )

  function handleMenuItemClick(index: string, indexPath: string[]) {
    if (index === activeIndex.value) return
    activeIndex.value = index
    activeMenus.value = indexPath
  }

  /**
   * opened sub menu
   */
  const openedMenus = ref<string[]>([])

  function openMenu(index: string, indexPath: string[]) {
    if (props.accordion) {
      openedMenus.value = openedMenus.value.filter(menuIndex =>
        indexPath.includes(menuIndex)
      )
    }
    openedMenus.value.push(index)
  }

  function closeMenu(index: string) {
    openedMenus.value = openedMenus.value.filter(menu => !menu.includes(index))
  }

  function handleMenuSubClick(index: string, indexPath: string[]) {
    const isOpened = openedMenus.value.includes(index)
    if (isOpened) {
      closeMenu(index)
    } else {
      openMenu(index, indexPath)
    }
  }

  return {
    activeIndex,
    activeMenus,
    levelOffsetCssVar,
    menuCssVar,
    openedMenus,
    // methods
    handleMenuItemClick,
    handleMenuSubClick,
  }
}
