import type { SidebarProps as SidebarPropsRaw } from '#/shadcn-ui/sidebar'

interface SidebarProps extends SidebarPropsRaw {}

export type { SidebarProps }

export { default as Sidebar } from './Sidebar.vue'
export { default as SidebarMenuItem } from './SidebarMenuItem.vue'
export { default as SidebarTrigger } from './SidebarTrigger.vue'
