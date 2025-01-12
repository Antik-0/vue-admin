import type { SidebarProps as SidebarPropsRaw } from '#/shadcn-ui/sidebar'
import type { MenuRecordRaw } from '@core/types'

interface SidebarProps extends SidebarPropsRaw {
  sidebarMenu?: MenuRecordRaw[]
}

export type { SidebarProps, SidebarPropsRaw }

export { default as Sidebar } from './Sidebar.vue'
export { default as SidebarTrigger } from './SidebarTrigger.vue'
