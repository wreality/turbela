<template>
  <router-view />
</template>

<script setup lang="ts">
definePage({
  redirect: { name: 'badges:index' },
  meta: {
    crumb: { label: 'Badges', appIcon: 'badge' },
  },
})
</script>

<style scoped></style>
