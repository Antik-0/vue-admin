<script lang="ts" setup>
import type { BreadcrumbProps } from './index'
import { Icon } from '#/icons'
import {
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Breadcrumb as UIBreadcrumb,
} from '#/shadcn-ui/breadcrumb'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '#/shadcn-ui/dropdown-menu'

interface Props extends BreadcrumbProps {}

withDefaults(defineProps<Props>(), {
  showIcon: false,
})

const emit = defineEmits<{ select: [string] }>()

function handleClick(path?: string) {
  if (!path) return
  emit('select', path)
}
</script>

<template>
  <UIBreadcrumb>
    <BreadcrumbList>
      <TransitionGroup name="breadcrumb-transition">
        <template
          v-for="(item, index) in breadcrumbs"
          :key="`${item.title}-${index}`"
        >
          <BreadcrumbItem>
            <div v-if="item.items?.length ?? 0 > 0">
              <DropdownMenu>
                <DropdownMenuTrigger
                  :class="[
                    index === breadcrumbs.length - 1
                      ? 'text-foreground'
                      : 'hover:text-foreground',
                  ]"
                  class="flex items-center bg-transparent"
                >
                  <Icon
                    v-if="showIcon"
                    :icon="item.icon!"
                    class="mr-1 size-4"
                  />
                  <span>{{ item.title }}</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem
                    v-for="menuItem in item.items"
                    :key="`sub-${menuItem.path}}`"
                    @click.stop="handleClick(menuItem.path)"
                  >
                    <Icon
                      v-if="showIcon"
                      :icon="menuItem.icon"
                      class="size-4"
                    />
                    <span>{{ menuItem.title }}</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <BreadcrumbLink
              v-else-if="index !== breadcrumbs.length - 1"
              href="javascript:void 0"
              @click.stop="handleClick(item.path)"
            >
              <div class="flex-center flex">
                <Icon v-if="showIcon" :icon="item.icon" class="mr-1 size-4" />
                <span>{{ item.title }}</span>
              </div>
            </BreadcrumbLink>

            <BreadcrumbPage v-else>
              <div class="flex-center flex">
                <Icon v-if="showIcon" :icon="item.icon" class="mr-1 size-4" />
                <span>{{ item.title }}</span>
              </div>
            </BreadcrumbPage>
            <BreadcrumbSeparator v-if="index < breadcrumbs.length - 1" />
          </BreadcrumbItem>
        </template>
      </TransitionGroup>
    </BreadcrumbList>
  </UIBreadcrumb>
</template>
