<template>
  <router-view />
</template>

<script setup lang="ts">
definePage({
  redirect: { name: '/admin/overlays/' },
  meta: {
    appIcon: 'overlay',
    crumb: { label: 'Overlays' },
  },
})
</script>

<style scoped></style>
