<script setup lang="ts">
import type { TabsProps } from './types'
import { ref } from 'vue'
import { UIIcon } from '#/components'
import { IconX } from '@repo/icons'

interface Props extends TabsProps {}

const props = withDefaults(defineProps<Props>(), {})

const tabsView = ref([
  {
    key: 'key',
    affixTab: false,
    icon: 'logos:vue',
    title: '测试',
  },
])

const activeTab = ref<string>('key')
</script>

<template>
  <div class="tabs-chrome flex h-full w-max overflow-y-hidden px-5">
    <TransitionGroup name="slide-left">
      <div
        v-for="(tab, index) in tabsView"
        :key="tab.key"
        :class="{
          'is-active': tab.key === activeTab,
          draggable: !tab.affixTab,
          'affix-tab': tab.affixTab,
        }"
        :data-active-tab="activeTab"
        :data-index="index"
        class="tabs-chorme__item draggable group relative transition-all isolate"
      >
        <!-- background -->
        <div
          class="tabs-chrome__background size-full absolute px-[6px] transition-opacity duration-150 z-[-1]"
        >
          <div
            class="tabs-chrome__background-content h-full rounded-tl-[6px] rounded-tr-[6px] duration-150 group-[.is-active]:bg-primary/15"
          ></div>
        </div>

        <!-- extra -->
        <span
          class="absolute top-center right-2 z-[3] rounded bg-white/50 p-0.5"
        >
          <IconX class="size-3" />
        </span>

        <!-- content -->
        <div
          class="tabs-chrome__content group-[.is-active]:text-primary text-accent-foreground inline-flex items-center h-full rounded-tl-[6px] rounded-tr-[6px] pl-2 pr-4 mx-3"
        >
          <UIIcon :icon="tab.icon" class="size-4 mr-1" />
          <span class="flex-1 whitespace-nowrap text-sm">
            {{ tab.title }}
          </span>
        </div>
      </div>
    </TransitionGroup>
  </div>
</template>
