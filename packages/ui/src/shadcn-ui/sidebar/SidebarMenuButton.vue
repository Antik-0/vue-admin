<script setup lang="ts">
import { type Component, computed } from 'vue'
import { Tooltip, TooltipContent, TooltipTrigger } from '../tooltip'
import SidebarMenuButtonChild, {
  type SidebarMenuButtonProps,
} from './SidebarMenuButtonChild.vue'
import { useSidebar } from './utils'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(
  defineProps<
    {
      tooltip?: string | Component
    } & SidebarMenuButtonProps
  >(),
  {
    as: 'button',
    size: 'default',
    variant: 'default',
  }
)

const { isMobile, state } = useSidebar()

const delegatedProps = computed(() => {
  const { tooltip: _tooltip, ...delegated } = props
  return delegated
})
</script>

<template>
  <SidebarMenuButtonChild
    v-if="!tooltip"
    v-bind="{ ...delegatedProps, ...$attrs }"
  >
    <slot></slot>
  </SidebarMenuButtonChild>

  <Tooltip v-else>
    <TooltipTrigger as-child>
      <SidebarMenuButtonChild v-bind="{ ...delegatedProps, ...$attrs }">
        <slot></slot>
      </SidebarMenuButtonChild>
    </TooltipTrigger>
    <TooltipContent
      :hidden="state !== 'collapsed' || isMobile"
      align="center"
      side="right"
    >
      <template v-if="typeof tooltip === 'string'">
        {{ tooltip }}
      </template>
      <component :is="tooltip" v-else />
    </TooltipContent>
  </Tooltip>
</template>
