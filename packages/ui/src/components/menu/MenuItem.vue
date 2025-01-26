<script setup lang="ts">
import type { MenuItemProps, MenuProvider, StyleValue } from './types'
import { Primitive } from 'radix-vue'
import { computed, getCurrentInstance, inject } from 'vue'
import { cn } from '#/utils'

const props = withDefaults(defineProps<MenuItemProps>(), {
  as: 'div',
  asChild: false,
  class: '',
  disabled: false,
})

const rootMenu = inject<MenuProvider>('rootMenu')!
if (!rootMenu) throw new Error('<MenuItem> can not inject root menu')

const isActive = computed(
  () => !props.disabled && props.index === rootMenu.activeIndex.value
)

const menuItemStyle = computed<StyleValue>(() => {
  return {
    paddingLeft: rootMenu.levelOffsetCssVar,
    width: rootMenu.isCollapsed.value ? `calc(var(--sidebar-width-icon))` : '',
  }
})

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
  rootMenu.handleMenuItemClick(props.index, indexPath.value)
}
</script>

<template>
  <li
    class="ui-menu-item relative h-10 w-full cursor-pointer list-none rounded-md transition-[all]"
    :class="{
      'is-active': isActive,
      'is-disabled': disabled,
    }"
    :data-active="isActive"
    :data-disabled="disabled"
    role="menuitem"
    @click.capture="handleClick"
  >
    <Primitive
      :as="as"
      :as-child="asChild"
      :class="cn('ui-menu-item__content text-base', props.class)"
      :style="menuItemStyle"
    >
      <slot></slot>
    </Primitive>
  </li>
</template>

<style>
.ui-menu-item__content {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  white-space: nowrap;
  color: var(--sidebar-foreground);
}

.ui-menu-item:hover {
  @apply bg-sidebar-accent;

  .ui-menu-item__content {
    @apply text-rose;
  }
}

.ui-menu-item.is-active[data-active='true'] {
  @apply bg-rose-100;

  .ui-menu-item__content {
    @apply text-rose;
  }
}

.ui-menu-item.is-disabled[data-disabled='true'] {
  @apply bg-transparent cursor-not-allowed;

  .ui-menu-item__content {
    @apply text-sidebar-accent-foreground;
  }
}
</style>
