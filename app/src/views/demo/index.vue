<script setup lang="ts">
const route = useRoute()
</script>

<template>
  <div>当前路由地址: {{ route.fullPath }}</div>
</template>
