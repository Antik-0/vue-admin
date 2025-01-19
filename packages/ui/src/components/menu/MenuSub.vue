<script setup lang="ts">
import type { ComponentInternalInstance, StyleValue } from 'vue'
import type { MenuSubProvider } from './types'
import { computed, getCurrentInstance, inject, provide, ref } from 'vue'
import { IconChevronDown } from '#/icons'
import { CollapseTransition } from '../collapse-transition'
import { useMenu } from './use-menu'

interface Props {
  title?: string
}

defineOptions({ name: 'MenuSub' })

withDefaults(defineProps<Props>(), {})

const collapsed = ref(false)

const { levelOffsetCssVar } = useMenu()
const menusubLabelStyle = computed<StyleValue>(() => {
  return {
    paddingLeft: levelOffsetCssVar,
  }
})

const instance = getCurrentInstance()!

function findParentMenu(instance: ComponentInternalInstance) {
  let parent = instance.parent
  while (parent && !['MenuSub', 'MenuView'].includes(parent.type.name!)) {
    parent = parent.parent
  }
  return { parentMenu: parent! }
}
const { parentMenu } = findParentMenu(instance)

const menusub = inject<MenuSubProvider>(`menusub:${parentMenu.uid}`)!

const menuLevelCssVar = ref(`--menu-level: ${menusub.menuLevel + 1}`)

provide<MenuSubProvider>(`menusub:${instance.uid}`, {
  menuLevel: menusub.menuLevel + 1,
})
</script>

<template>
  <li :data-state="collapsed ? 'close' : 'open'" role="menuitem">
    <div
      :style="menusubLabelStyle"
      class="relative box-border h-10 w-full flex cursor-pointer items-center gap-2 whitespace-nowrap rounded-md py-2 text-base transition-[all] [&>svg]:shrink-0 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground [&>svg]:transition-transform [&>svg]:duration-400 group-hover/item:[&>svg]:scale-120"
      @click="collapsed = !collapsed"
    >
      <slot name="title">
        <span>{{ title }}</span>
      </slot>
      <span class="top-center absolute right-[var(--menu-padding)]">
        <IconChevronDown
          :style="!collapsed ? 'transform: rotateZ(180deg)' : ''"
          class="transition-transform duration-400"
        />
      </span>
    </div>
    <CollapseTransition>
      <ol
        v-show="!collapsed"
        :style="menuLevelCssVar"
        class="flex flex-col gap-1"
        role="menu"
      >
        <slot></slot>
      </ol>
    </CollapseTransition>
  </li>
</template>
