<script lang="ts" setup>
import type { BreadcrumbProps } from './props'
import { LucideChevronDown } from '#/icons'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '#/shadcn-ui/breadcrumb'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '#/shadcn-ui/dropdown-menu'

interface Props extends BreadcrumbProps {}

defineOptions({ name: 'UIBreadcrumb' })

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
  <Breadcrumb>
    <BreadcrumbList>
      <TransitionGroup name="breadcrumb-transition">
        <template
          v-for="(item, index) in breadcrumbs"
          :key="`${item.title}-${index}`"
        >
          <BreadcrumbItem>
            <div v-if="item.items?.length ?? 0 > 0">
              <DropdownMenu>
                <DropdownMenuTrigger class="flex items-center gap-1">
                  <LucideChevronDown class="size-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem
                    v-for="menuItem in item.items"
                    :key="`sub-${menuItem.path}}`"
                    @click.stop="handleClick(menuItem.path)"
                  >
                    {{ menuItem.title }}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <BreadcrumbLink
              v-else-if="index !== breadcrumbs.length - 1"
              href="javascript:void 0"
              @click.stop="handleClick(item.path)"
            >
              <div class="flex flex-center">
                <span>{{ item.title }}</span>
              </div>
            </BreadcrumbLink>

            <BreadcrumbPage v-else>
              <div class="flex flex-center">
                <span>{{ item.title }}</span>
              </div>
            </BreadcrumbPage>
            <BreadcrumbSeparator
              v-if="index < breadcrumbs.length - 1 && !item.isHome"
            />
          </BreadcrumbItem>
        </template>
      </TransitionGroup>
    </BreadcrumbList>
  </Breadcrumb>
</template>
