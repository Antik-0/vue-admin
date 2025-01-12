<script setup lang="ts">
import type { MenuRecordRaw } from '@core/types'
import { IconChevronDown } from '#/icons'
import { Icon } from '#/icons'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '#/shadcn-ui/collapsible'
import {
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarGroup as UISidebarGroup,
} from '#/shadcn-ui/sidebar'
import SidebarMenu from './SidebarMenu.vue'

interface Props {
  menuGroup: MenuRecordRaw | MenuRecordRaw[]
}

defineProps<Props>()
</script>

<template>
  <UISidebarGroup>
    <template v-if="Array.isArray(menuGroup)">
      <SidebarGroupContent>
        <SidebarMenu :menus="menuGroup" />
      </SidebarGroupContent>
    </template>

    <template v-else>
      <template v-if="menuGroup.collapsible">
        <Collapsible class="group/collapsible">
          <CollapsibleTrigger as-child>
            <SidebarGroupLabel>
              <Icon :icon="menuGroup.icon" class="mr-2" />
              <span>{{ menuGroup.name }}</span>
              <IconChevronDown
                class="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180"
              />
            </SidebarGroupLabel>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <SidebarGroupContent>
              <SidebarMenu :menus="menuGroup.children" />
            </SidebarGroupContent>
          </CollapsibleContent>
        </Collapsible>
      </template>

      <template v-else>
        <SidebarGroupLabel>
          <Icon :icon="menuGroup.icon" class="mr-2" />
          <span>{{ menuGroup.name }}</span>
        </SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu :menus="menuGroup.children" />
        </SidebarGroupContent>
      </template>
    </template>
  </UISidebarGroup>
</template>
