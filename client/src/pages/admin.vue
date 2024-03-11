<template>
  <router-view />
</template>

<script setup lang="ts">
import { definePage } from 'vue-router/auto'
definePage({
  meta: {
    crumb: {
      label: 'Settings',
      icon: 'admin_panel_settings',
    },
  },
})
</script>

<style scoped></style>
