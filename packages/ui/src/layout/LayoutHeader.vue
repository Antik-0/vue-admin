<script setup lang="ts">
import { type CSSProperties, computed, useSlots } from 'vue'
import {
  FullScreen,
  LanguageToggle,
  Notification,
  Perferences,
  Refresh,
  SidebarToggle,
  ThemeToggle,
} from './widget'

interface Props {
  /**
   * 横屏
   */
  fullWidth: boolean
  /*
   * 宽度
   */
  width: string
  /*
   * 高度
   */
  height: number
  /*
   * 侧边菜单宽度
   */
  sidebarWidth: number
  /*
   * 是否移动端
   */
  isMobile: boolean
  /*
   * 是否显示
   */
  show: boolean
  /*
   * zIndex
   */
  zIndex: number
  /*
   * 主题
   */
  theme?: string
}

const props = withDefaults(defineProps<Props>(), {})

const slots = useSlots()

const style = computed((): CSSProperties => {
  const { fullWidth, height, show } = props
  const right = !show || !fullWidth ? undefined : 0
  return {
    height: `${height}px`,
    marginTop: show ? 0 : `-${height}px`,
    right,
  }
})

const logoStyle = computed(() => {
  return {
    minWidth: `${props.isMobile ? 40 : props.sidebarWidth}px`,
  }
})
</script>

<template>
  <header
    :class="theme"
    :style="style"
    class="bg-header top-0 w-full flex flex-[0_0_auto] items-center border-b-1 border-border border-solid transition-[margin] duration-200"
  >
    <div v-if="slots.logo" :style="logoStyle">
      <slot name="logo"></slot>
    </div>

    <slot name="toggle-button">
      <SidebarToggle />
    </slot>

    <slot name="refresh">
      <Refresh />
    </slot>

    <slot name="breadcrumb"> </slot>

    <div class="flex-1"></div>

    <div class="flex">
      <FullScreen />
      <Perferences />
      <ThemeToggle />
      <LanguageToggle />
      <Notification />
    </div>
  </header>
</template>
