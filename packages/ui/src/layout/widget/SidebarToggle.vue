<script setup lang="ts">
import { IconButton } from '#/components/button'
import { SidebarTrigger } from '#/sidebar-ui'
import { IconMenu } from '@repo/icons'
</script>

<template>
  <SidebarTrigger type="offcanvas">
    <IconButton>
      <IconMenu />
    </IconButton>
  </SidebarTrigger>
</template>
