<template>
  <router-view />
</template>

<script setup lang="ts">
definePage({
  redirect: { name: '/admin/plans/' },
  meta: {
    appIcon: 'plan',
    crumb: { label: 'Plans' },
  },
})
</script>

<style scoped></style>
