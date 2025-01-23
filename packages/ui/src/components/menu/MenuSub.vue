<script setup lang="ts">
import type { ComponentInternalInstance } from 'vue'
import type { MenuSubProps, MenuSubProvider, StyleValue } from './types'
import { computed, getCurrentInstance, inject, provide, ref } from 'vue'
import { IconChevronDown } from '#/icons'
import { CollapseTransition } from '../collapse-transition'
import { useMenu } from './use-menu'

defineOptions({ name: 'MenuSub' })

const props = withDefaults(defineProps<MenuSubProps>(), {
  disabled: false,
})

const collapsed = ref(false)

const { activeParentIndex, levelOffsetCssVar } = useMenu()

const isActive = computed(() => activeParentIndex.value.includes(props.index))

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
      class="group/item relative box-border h-10 w-full flex cursor-pointer items-center gap-2 whitespace-nowrap rounded-md py-2 text-base transition-[all] hover:bg-sidebar-accent data-[active=true]:text-rose-500 hover:text-sidebar-accent-foreground"
      :data-active="isActive"
      :style="menusubLabelStyle"
      @click="collapsed = !collapsed"
    >
      <slot name="title">
        <span>{{ title }}</span>
      </slot>
      <span class="top-center absolute right-[var(--menu-padding)]">
        <IconChevronDown
          class="transition-transform duration-400"
          :style="!collapsed ? 'transform: rotateZ(180deg)' : ''"
        />
      </span>
    </div>
    <CollapseTransition>
      <ol
        v-show="!collapsed"
        class="flex flex-col gap-1"
        role="menu"
        :style="menuLevelCssVar"
      >
        <slot></slot>
      </ol>
    </CollapseTransition>
  </li>
</template>
