<script setup lang="ts">
import { Primitive } from 'radix-vue'
import { computed, getCurrentInstance, inject } from 'vue'
import { cn } from '#/utils'
import {
  type MenuItemProps,
  type MenuProvider,
  MENU_PADDING_OFFSET,
} from './menu'

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
    class="ui-menu-item relative h-10 w-full cursor-pointer list-none rounded-lg transition-all"
    :data-active="isActive"
    :data-disabled="disabled"
    data-menu="menuitem"
    role="menuitem"
    @click.capture="handleClick"
  >
    <Primitive
      :as="as"
      :as-child="asChild"
      :class="
        cn(
          'ui-menu-item__content flex items-center gap-2 w-full h-full text-base p-[8px_var(--menu-base-padding)]',
          props.class
        )
      "
      :style="{
        paddingLeft: MENU_PADDING_OFFSET,
      }"
    >
      <slot></slot>
    </Primitive>
  </li>
</template>

<style>
.ui-menu-item__content > svg:first-child {
  @apply size-[--menu-icon-size] shrink-0;
}

.ui-menu-item__content > span {
  @apply flex-1 whitespace-nowrap overflow-hidden;
}

.ui-menu-item[data-active='true'] {
  background-color: var(--menu-bg-color-active);

  .ui-menu-item__content {
    color: var(--menu-text-color-active);
  }
}

.ui-menu-item[data-disabled='true'] {
  @apply opacity-25 bg-transparent cursor-not-allowed;
}

.ui-menu-item:not([data-active='true'], [data-disabled='true']):hover {
  background-color: var(--menu-bg-color-hover);

  .ui-menu-item__content {
    color: var(--menu-text-color-hover);
  }
}
</style>
