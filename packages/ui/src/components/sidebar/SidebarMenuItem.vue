<script setup lang="ts">
import type { MenuRecordRaw } from '@core/types'
import { computed } from 'vue'
import { Icon } from '#/icons'
import { IconChevronDown } from '#/icons'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '#/shadcn-ui/collapsible'
import {
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarMenuItem as UISidebarMenuItem,
} from '#/shadcn-ui/sidebar'
import SidebarMenuItemLink from './SidebarMenuItemLink.vue'

interface Props {
  menuItem: MenuRecordRaw
}

defineOptions({ inheritAttrs: false })

const props = defineProps<Props>()

const hasChildren = computed(() => {
  const children = props.menuItem.children
  return Array.isArray(children) && children.length !== 0
})
</script>

<template>
  <Collapsible v-if="hasChildren" class="group/collapsible">
    <CollapsibleTrigger as-child>
      <UISidebarMenuItem v-bind="$attrs" :key="menuItem.key">
        <SidebarMenuButton>
          <Icon v-if="menuItem.icon" :icon="menuItem.icon" />
          <span>{{ menuItem.name }}</span>
          <IconChevronDown
            class="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180"
          />
        </SidebarMenuButton>
      </UISidebarMenuItem>
    </CollapsibleTrigger>
    <CollapsibleContent as-child>
      <SidebarMenuSub>
        <SidebarMenuSubItem v-for="item in menuItem.children" :key="item.key">
          <SidebarMenuSubButton as-child>
            <SidebarMenuItem :menu-item="item" />
          </SidebarMenuSubButton>
        </SidebarMenuSubItem>
      </SidebarMenuSub>
    </CollapsibleContent>
  </Collapsible>

  <UISidebarMenuItem v-else v-bind="$attrs" :key="menuItem.key">
    <SidebarMenuButton as-child>
      <SidebarMenuItemLink :to="menuItem.path">
        <Icon v-if="menuItem.icon" :icon="menuItem.icon" />
        <span>{{ menuItem.name }}</span>
      </SidebarMenuItemLink>
    </SidebarMenuButton>
  </UISidebarMenuItem>
</template>
