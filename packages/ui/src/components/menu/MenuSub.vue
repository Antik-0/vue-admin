<script setup lang="ts">
import type { ComponentInternalInstance } from 'vue'
import type {
  MenuProvider,
  MenuSubProps,
  MenuSubProvider,
  StyleValue,
} from './types'
import { computed, getCurrentInstance, inject, provide } from 'vue'
import { IconChevronDown } from '#/icons'
import { CollapseTransition } from '../collapse-transition'

defineOptions({ name: 'MenuSub' })

const props = withDefaults(defineProps<MenuSubProps>(), {
  disabled: false,
})

const rootMenu = inject<MenuProvider>('rootMenu')!
if (!rootMenu) throw new Error('<MenuSub> can not inject root menu')

const isOpened = computed(() =>
  rootMenu.openedMenus.value.includes(props.index)
)

const isActive = computed(
  () => !props.disabled && rootMenu.activeMenus.value.includes(props.index)
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

const menusubLabelStyle = computed<StyleValue>(() => {
  return {
    paddingLeft: rootMenu.levelOffsetCssVar,
    paddingRight: '32px',
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

const menuLevelCssVar = `--menu-level: ${subMenu.menuLevel + 1}`

provide<MenuSubProvider>(`menusub:${instance.uid}`, {
  menuLevel: subMenu.menuLevel + 1,
})
</script>

<template>
  <li :data-state="isOpened ? 'open' : 'close'" role="menuitem">
    <div
      class="ui-menu-sub__title rounded-md text-base transition-[all]"
      :class="{
        'is-active': isActive,
        'is-disabled': disabled,
      }"
      :data-active="isActive"
      :data-disabled="disabled"
      :style="menusubLabelStyle"
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
        class="flex flex-col gap-1"
        role="menu"
        :style="menuLevelCssVar"
      >
        <slot></slot>
      </ol>
    </CollapseTransition>
  </li>
</template>

<style>
.ui-menu-sub__title {
  position: relative;
  width: 100%;
  height: 2.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  white-space: nowrap;
  color: var(--sidebar-foreground);
  cursor: pointer;
}

.ui-menu-sub__title:hover {
  @apply bg-sidebar-accent text-rose;
}

.ui-menu-sub__title.is-active[data-active='true'] {
  @apply text-rose;
}

.ui-menu-sub__title.is-disabled[data-disabled='true'] {
  @apply bg-transparent text-sidebar-accent-foreground;
}
</style>
