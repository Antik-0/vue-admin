import type { Component } from 'vue'

export interface BreadcrumbItem {
  icon?: string | Component
  items?: BreadcrumbItem[]
  path?: string
  title?: string
}

export interface BreadcrumbProps {
  breadcrumbs: BreadcrumbItem[]
  showIcon?: boolean
}
