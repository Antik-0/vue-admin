<script setup lang="ts">
import type { TabsProps } from './types'
import { ref } from 'vue'
import { UIIcon } from '#/components'
import { IconX } from '@repo/icons'

interface Props extends TabsProps {}

withDefaults(defineProps<Props>(), {})

const tabsView = ref([
  {
    key: '1',
    affixTab: false,
    icon: 'logos:vue',
    title: '测试',
  },
  {
    key: '2',
    affixTab: false,
    icon: 'logos:react',
    title: '测试',
  },
  {
    key: '3',
    affixTab: false,
    icon: 'logos:webpack',
    title: '测试',
  },
])

const activeTab = ref<string>('2')
</script>

<template>
  <div class="tabs-chrome flex pt-1">
    <TransitionGroup name="slide-left">
      <div
        v-for="(tab, index) in tabsView"
        :key="tab.key"
        :class="{
          'is-active': tab.key === activeTab,
          'affix-tab': tab.affixTab,
          draggable: !tab.affixTab,
        }"
        :data-active-tab="activeTab"
        :data-index="index"
        class="tabs-chrome__item draggable group relative z-0 transition-all -ml-2"
        @click="activeTab = tab.key"
      >
        <!-- background -->
        <div
          class="tabs-chrome__background absolute inset-0 z-[-1] px-[6px] transition-color duration-150"
        >
          <div
            class="tabs-chrome__background-content h-full rounded-t-md duration-150 group-[.is-active]:bg-red/30"
          ></div>
          <svg
            class="tabs-chrome__background-before absolute bottom-0 left-[-1px] fill-transparent transition-colors duration-150 group-[.is-active]:fill-red/30"
            height="7"
            width="7"
          >
            <path d="M 0 7 A 7 7 0 0 0 7 0 L 7 7 Z" />
          </svg>
          <svg
            class="tabs-chrome__background-after absolute bottom-0 right-[-1px] fill-transparent transition-colors duration-150 group-[.is-active]:fill-red/30"
            height="7"
            width="7"
          >
            <path d="M 0 0 A 7 7 0 0 0 7 7 L 0 7 Z" />
          </svg>
        </div>

        <!-- content -->
        <div
          class="tabs-chrome__content pointer-events-none h-full inline-flex items-center rounded-[6px] pl-5 pr-9 text-accent-foreground group-[.is-active]:text-red"
        >
          <UIIcon :icon="tab.icon" class="mr-1 size-4" />
          <span class="flex-1 select-none whitespace-nowrap text-sm">
            {{ tab.title }}
          </span>
        </div>

        <!-- extra -->
        <span
          class="top-center absolute right-3 z-[1] rounded bg-transparent p-[2px] transition-colors duration-150 hover:bg-white/50"
        >
          <IconX class="size-3 text-primary" />
        </span>
      </div>
    </TransitionGroup>
  </div>
</template>

<style scoped>
.tabs-chrome__item {
  &:not(.is-active):hover {
    .tabs-chrome__background {
      @apply pb-1;

      .tabs-chrome__background-content {
        @apply rounded-md bg-primary/15;
      }
    }
  }
}
</style>
