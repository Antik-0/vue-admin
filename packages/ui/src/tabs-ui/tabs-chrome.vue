<script setup lang="ts">
import type { TabsProps } from './types'
import { ref } from 'vue'
import { Icon, IconX } from '#/icons'

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

function handleDeleteTab(tab: any) {
  tabsView.value = tabsView.value.filter(v => v !== tab)
}
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
        class="group tabs-chrome__item draggable relative z-0 transition-all -ml-2"
        @click="activeTab = tab.key"
      >
        <div
          class="tabs-chrome__background absolute inset-0 z-[-1] px-[6px] text-transparent transition-colors group-[.is-active]:text-rose/50"
        >
          <div
            class="tabs-chrome__background-content h-full rounded-t-md bg-current"
          ></div>
        </div>

        <div
          class="tabs-chrome__content pointer-events-none h-full inline-flex items-center rounded-[6px] pl-5 pr-9 text-accent-foreground group-[.is-active]:text-rose"
        >
          <Icon :icon="tab.icon" class="mr-1 size-4" />
          <span class="flex-1 select-none whitespace-nowrap text-sm">
            {{ tab.title }}
          </span>
        </div>

        <span
          class="top-center absolute right-3 z-[1] rounded bg-transparent p-[2px] transition-colors hover:bg-white/50"
          @click.stop="handleDeleteTab(tab)"
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

.tabs-chrome__background::before,
.tabs-chrome__background::after {
  content: '';
  position: absolute;
  bottom: 0;
  width: 12px;
  height: 12px;
}

.tabs-chrome__background::before {
  left: -6px;
  background: radial-gradient(
    circle at 0 0,
    transparent 12px,
    currentColor 13px
  );
}

.tabs-chrome__background::after {
  right: -6px;
  background: radial-gradient(
    circle at 100% 0,
    transparent 12px,
    currentColor 13px
  );
}
</style>
