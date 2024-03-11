<template>
  <router-view />
</template>

<script setup lang="ts">
definePage({
  redirect: { name: 'settings:index' },
  meta: {
    crumb: {
      label: 'Settings',
      icon: 'admin_panel_settings',
    },
  },
})
</script>

<style scoped></style>
