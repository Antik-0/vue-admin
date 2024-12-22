import type { MenuRecordRaw, RouteMeta as RouteMetaRaw } from '@core/types'
import type { Router } from 'vue-router'

type MenuName = MenuRecordRaw['name']

/**
 * 根据扁平路由数组，构造嵌套菜单
 * @param router 路由器
 */
function createMenuRecord(router: Router): MenuRecordRaw[] {
  const routes = router.getRoutes()

  const menuRecordMap: Record<MenuName, MenuRecordRaw> = {}
  const parentMap: Record<MenuName, MenuName> = {}

  const rootGuard = '#root'
  Reflect.set(menuRecordMap, rootGuard, { children: [] })

  // 遍历路由，构造菜单记录
  for (const route of routes) {
    const currName = route.name as string
    const currPath = route.path

    const {
      activeIcon,
      activePath,
      hideChildrenInMenu,
      hideInMenu,
      icon,
      link,
      order,
      title,
    } = route.meta as unknown as RouteMetaRaw

    const menuRecord = {
      name: title,
      path: link || currPath,
      activeIcon,
      activePath,
      hide: hideInMenu,
      hideChildren: hideChildrenInMenu,
      icon,
      order,
      children: [],
    }
    menuRecordMap[currName] = menuRecord

    for (const subRoute of route.children) {
      const subName = subRoute.name as string
      parentMap[subName] = currName
    }
  }

  // 根据 parentMap 建立的父节点引用，将对应的子节点插入到对应的父节点
  for (const route of routes) {
    if (route.meta?.hideInMenu) continue

    const name = route.name as string
    const parentName = parentMap[name] || rootGuard

    const parentMenu = menuRecordMap[parentName]!
    if (!parentMenu?.hideChildren) {
      parentMenu.children.push(menuRecordMap[name]!)
    }
  }

  const menuRoot = Reflect.get(menuRecordMap, rootGuard)

  // 菜单排序
  const menuRecord = menuRoot.children.toSorted((a, b) => {
    return (a.order || 9999) - (b.order || 9999)
  })
  return menuRecord
}

export { createMenuRecord }
