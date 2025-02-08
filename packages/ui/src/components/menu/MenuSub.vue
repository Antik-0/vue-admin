<script setup lang="ts">
import {
  type ComponentInternalInstance,
  type StyleValue,
  computed,
  getCurrentInstance,
  inject,
  provide,
} from 'vue'
import { IconChevronDown } from '#/icons'
import { CollapseTransition } from '../collapse-transition'
import {
  type MenuProvider,
  type MenuSubProps,
  type MenuSubProvider,
  MENU_PADDING_OFFSET,
} from './menu'

defineOptions({ name: 'MenuSub' })

const props = withDefaults(defineProps<MenuSubProps>(), {
  disabled: false,
})

const rootMenu = inject<MenuProvider>('rootMenu')!
if (!rootMenu) throw new Error('<MenuSub> can not inject root menu')
const { activeMenus, isCollapsed, openedMenus } = rootMenu

const isOpened = computed(() => openedMenus.value.includes(props.index))

const isActive = computed(
  () => !props.disabled && activeMenus.value.includes(props.index)
)

const instance = getCurrentInstance()!
const indexPath = computed(() => {
  let parent = instance.parent!
  const path = [props.index]
  while (parent.type.name !== 'MenuView') {
    if (parent.props.index) {
      path.unshift(parent.props.index as string)
    }
    parent = parent.parent!
  }
  return path
})

function handleClick(event: MouseEvent) {
  if (props.disabled) {
    event.stopImmediatePropagation()
    event.preventDefault()
    return
  }
  rootMenu.handleMenuSubClick(props.index, indexPath.value)
}

const menusubTitleStyle = computed<StyleValue>(() => {
  return {
    paddingLeft: MENU_PADDING_OFFSET,
    paddingRight: isCollapsed.value ? 'var(--menu-base-padding)' : '32px',
  }
})

function findParentMenu(instance: ComponentInternalInstance) {
  let parent = instance.parent!
  while (!['MenuSub', 'MenuView'].includes(parent.type.name!)) {
    parent = parent.parent!
  }
  return { parentMenu: parent }
}
const { parentMenu } = findParentMenu(instance)

const subMenu = inject<MenuSubProvider>(`menusub:${parentMenu.uid}`)!
if (!subMenu) throw new Error('<MenuSub> can not inject sub menu')

const currentMenuLevel = subMenu.menuLevel + 1
const menuLevelCssVar = `--menu-level: ${currentMenuLevel}`

provide<MenuSubProvider>(`menusub:${instance.uid}`, {
  menuLevel: currentMenuLevel,
})
</script>

<template>
  <li
    class="ui-menu-sub"
    :data-active="isActive"
    :data-disabled="disabled"
    data-menu="menusub"
    :data-state="isOpened ? 'open' : 'close'"
    role="menuitem"
  >
    <template v-if="isCollapsed">
      <div
        class="ui-menu-sub__title h-10 w-full rounded-lg text-base transition-[all] data-[active=true]:bg-[--menu-bg-color-active]"
        :data-active="isActive"
      >
        <slot name="title"></slot>
      </div>
    </template>

    <template v-else>
      <div
        class="ui-menu-sub__title h-10 w-full rounded-lg text-base transition-[all]"
        :style="menusubTitleStyle"
        @click="handleClick"
      >
        <slot name="title">
          <span>{{ title }}</span>
        </slot>
        <span class="absolute right-2 top-0 h-full flex items-center">
          <IconChevronDown
            class="size-4 transition-transform duration-400"
            :style="isOpened ? 'transform: rotate(180deg)' : ''"
          />
        </span>
      </div>
      <CollapseTransition>
        <ol
          v-show="isOpened"
          class="flex flex-col gap-1 pt-1"
          role="menu"
          :style="menuLevelCssVar"
        >
          <slot></slot>
        </ol>
      </CollapseTransition>
    </template>
  </li>
</template>

<style>
.ui-menu-sub__title {
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px var(--menu-base-padding);
  white-space: nowrap;
  overflow: hidden;
  cursor: pointer;
}

.ui-menu-sub__title > svg:first-child {
  @apply size-[--menu-icon-size] shrink-0;
}

.ui-menu-sub[data-active='true'] > .ui-menu-sub__title {
  color: var(--menu-text-color-active);
}

.ui-menu-sub[data-disabled='true'] > .ui-menu-sub__title {
  @apply opacity-25 bg-transparent cursor-not-allowed;
}

.ui-menu-sub:not([data-disabled='true'])
  > .ui-menu-sub__title:not([data-active='true']):hover {
  color: var(--menu-text-color-hover);
  background-color: var(--menu-bg-color-hover);
}
</style>
