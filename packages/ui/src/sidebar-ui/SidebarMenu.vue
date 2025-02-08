<script setup lang="ts">
import { type MenuProps, Menu } from '#/components'
import { useSidebar } from './use-sidebar'

interface Props extends Omit<MenuProps, 'collapse'> {}

const props = defineProps<Props>()

const { collapse } = useSidebar()
</script>

<template>
  <Menu class="w-full" :collapse="collapse" v-bind="props">
    <slot></slot>
  </Menu>
</template>
