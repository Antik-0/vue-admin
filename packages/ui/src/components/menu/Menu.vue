<script setup lang="ts">
import { computed, getCurrentInstance, provide, ref, watch } from 'vue'
import { cn } from '#/utils'
import {
  type MenuProps,
  type MenuProvider,
  type MenuSubProvider,
  MENU_BASE_PADDING,
  MENU_ICON_SIZE,
  MENU_LEVEL_PADDING,
} from './menu'

defineOptions({ name: 'MenuView' })

const props = withDefaults(defineProps<MenuProps>(), {
  accordion: false,
  class: '',
  collapse: false,
  defaultIndex: '',
})

const activeIndex = ref<string>(props.defaultIndex)
const activeMenus = ref<string[]>([])

watch(
  () => props.defaultIndex,
  value => (activeIndex.value = value)
)

function handleMenuItemClick(index: string, indexPath: string[]) {
  if (index === activeIndex.value) return
  activeIndex.value = index
  activeMenus.value = indexPath
}

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
  openedMenus.value = openedMenus.value.filter(
    menuIndex => !menuIndex.includes(index)
  )
}

function handleMenuSubClick(index: string, indexPath: string[]) {
  const isOpened = openedMenus.value.includes(index)
  if (isOpened) {
    closeMenu(index)
  } else {
    openMenu(index, indexPath)
  }
}

const isCollapsed = computed(() => props.collapse === true)

const menuStyle = computed(() => {
  const collapsedWith =
    'calc(var(--menu-icon-size) + var(--menu-base-padding) * 2)'
  return {
    width: isCollapsed.value ? collapsedWith : '',
  }
})

const instance = getCurrentInstance()!

provide<MenuProvider>('rootMenu', {
  activeIndex,
  activeMenus,
  isCollapsed,
  openedMenus,
  // methods
  handleMenuItemClick,
  handleMenuSubClick,
})

provide<MenuSubProvider>(`menusub:${instance.uid}`, {
  menuLevel: 0,
})
</script>

<template>
  <menu
    :class="
      cn(
        'ui-menu flex flex-col gap-1 duration-400 transition-[width] ease-in-out',
        props.class
      )
    "
    :data-accordion="props.accordion"
    :data-collapse="props.collapse"
    data-menu="menuroot"
    role="menu"
    :style="{
      '--menu-level': 0,
      '--menu-base-padding': MENU_BASE_PADDING,
      '--menu-level-padding': MENU_LEVEL_PADDING,
      '--menu-icon-size': MENU_ICON_SIZE,
      ...menuStyle,
    }"
  >
    <slot></slot>
  </menu>
</template>

<style>
.ui-menu {
  --menu-color-primary: 351 95% 71%;
  --menu-color-muted: 215 16% 46%;
  --menu-text-color-hover: hsl(var(--menu-color-primary));
  --menu-text-color-active: hsl(var(--menu-color-primary));
  --menu-bg-color-hover: hsl(var(--menu-color-primary) / 0.1);
  --menu-bg-color-active: hsl(var(--menu-color-primary) / 0.25);
}

.ui-menu[data-collapse='true']
  :is(.ui-menu-sub__title, .ui-menu-item__content)
  > span {
  display: none;
}
</style>
