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
        class="tabs-chrome__item draggable group relative transition-all z-0 ml-[-8px]"
        @click="activeTab = tab.key"
      >
        <!-- background -->
        <div
          class="tabs-chrome__background absolute inset-0 px-[6px] z-[-1] transition-color duration-150"
        >
          <div
            class="tabs-chrome__background-content h-full rounded-tl rounded-tr duration-150 group-[.is-active]:bg-red/90"
          ></div>
          <svg
            class="tabs-chrome__background-before absolute bottom-0 left-[-1px] fill-transparent transition-colors duration-150 group-[.is-active]:fill-red"
            height="7"
            width="7"
          >
            <path d="M 0 7 A 7 7 0 0 0 7 0 L 7 7 Z" />
          </svg>
          <svg
            class="tabs-chrome__background-after absolute bottom-0 right-[-1px] fill-transparent group-[.is-active]:fill-red transition-colors duration-150"
            height="7"
            width="7"
          >
            <path d="M 0 0 A 7 7 0 0 0 7 7 L 0 7 Z" />
          </svg>
        </div>

        <!-- extra -->
        <span
          class="absolute top-center z-[1] rounded right-3 p-[2px] bg-transparent hover:bg-white/50 transition-colors duration-150"
        >
          <IconX class="size-3 text-primary" />
        </span>

        <!-- content -->
        <div
          class="tabs-chrome__content text-accent-foreground inline-flex items-center pr-9 pl-6 h-full rounded-[6px] group-[.is-active]:text-primary pointer-events-none"
        >
          <UIIcon :icon="tab.icon" class="size-4 mr-1" />
          <span class="flex-1 text-sm whitespace-nowrap select-none">
            {{ tab.title }}
          </span>
        </div>
      </div>
    </TransitionGroup>
  </div>
</template>

<style scoped>
.tabs-chrome__item {
  &:not(.is-active):hover {
    .tabs-chrome__background {
      @apply pb-1;
    }

    .tabs-chrome__background-content {
      @apply rounded bg-primary/15;
    }
  }
}
</style>
