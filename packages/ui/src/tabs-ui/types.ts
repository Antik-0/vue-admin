import type { TabDefinition } from '@core/types'

export interface TabsProps {
  /**
   * 选项卡元数据
   */
  tabs?: TabDefinition[]
  /**
   * 当前激活的选项卡
   */
  active?: string
  /**
   * content class
   */
  contentClass?: string
  /**
   * 间隙
   * @default 8px
   */
  gap?: number
  /**
   * 是否显示图标
   * @default true
   */
  showIcon?: boolean
  /**
   * 是否可以拖拽
   * @default true
   */
  draggable?: boolean
  /**
   * 是否响应滚轮事件
   * @default true
   */
  wheelable?: boolean
  /**
   * 右键上下文菜单
   */
  contextMenus?: (data: any) => any[]
}

export interface TabsEmits {
  close: [string]
  sortTabs: [number, number]
  unpin: [any]
}
