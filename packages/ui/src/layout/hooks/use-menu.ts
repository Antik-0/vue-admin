import type { MenuRecordRaw, RouteMetaRaw } from '@core/types'
import type { Router } from 'vue-router'
import { type ShallowRef, effectScope, shallowRef } from 'vue'
import { useRouter } from 'vue-router'

type MenuName = MenuRecordRaw['name']

interface MenuState {
  sidebarMenu: ShallowRef<MenuRecordRaw[]>
}

const ERROR_TEXT = 'useMenu must be run within the scope of <router-view>'

/**
 * 根据扁平化路由数组，构造侧边栏菜单
 */
function createMenuRecord(router: Router): MenuRecordRaw[] {
  if (!router) return []
  const routes = router.getRoutes()

  const menuParentMap: Record<MenuName, MenuName> = {}
  const menuRecordMap: Record<MenuName, MenuRecordRaw> = {}

  const rootGuard = '#root'
  Reflect.set(menuRecordMap, rootGuard, { children: [] })

  // 遍历路由，构造菜单
  for (const route of routes) {
    const currName = route.name as string
    const currPath = route.path as string

    const {
      activeIcon,
      collapsible = false,
      hideChildrenInMenu = false,
      hideInMenu = false,
      icon,
      isGroup = false,
      link,
      order = 0,
      title,
    } = route.meta as unknown as RouteMetaRaw

    const menuRecord = {
      key: currName,
      name: title,
      path: link || currPath,
      activeIcon,
      collapsible,
      hidden: hideInMenu,
      hideChildren: hideChildrenInMenu,
      icon,
      isGroup,
      order,
      children: [],
    }
    menuRecordMap[currName] = menuRecord

    for (const subRoute of route.children) {
      const subName = subRoute.name as string
      menuParentMap[subName] = currName
    }
  }

  // 根据 menuParentMap 建立的父节点引用，将子节点插入到对应的父节点
  for (const route of routes) {
    if (route.meta.hideInMenu) continue
    const name = route.name as string
    const parentName = menuParentMap[name] || rootGuard
    const parentMenu = menuRecordMap[parentName]!
    if (!parentMenu.hideChildren) {
      parentMenu.children.push(menuRecordMap[name]!)
    }
  }

  const menuRoot = Reflect.get(menuRecordMap, rootGuard)

  // 菜单排序，只针对第一层
  const menuRecord = menuRoot.children.toSorted((a, b) => {
    return a.order - b.order
  })

  return menuRecord
}

/**
 * 创建共享的菜单作用域
 */
function createMenuScope() {
  let hasLoaded = false
  const state: MenuState = {
    sidebarMenu: shallowRef([]),
  }
  const scope = effectScope(true)

  function createState() {
    const router = useRouter()
    if (!router) {
      throw new Error(ERROR_TEXT)
    }

    const sidebarMenu = shallowRef(createMenuRecord(router))
    return { sidebarMenu }
  }

  return () => {
    if (hasLoaded === false) {
      const scopeState = scope.run(createState)!
      state.sidebarMenu = scopeState.sidebarMenu
      hasLoaded = true
    }
    return state
  }
}

const useSidebarMenu = createMenuScope()

export { useSidebarMenu }
