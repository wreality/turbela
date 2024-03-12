<template>
  <router-view />
</template>

<script setup lang="ts">
definePage({
  redirect: { name: 'volunteers:index' },
  meta: {
    crumb: {
      label: 'Volunteers',
      icon: 'volunteer_activism',
    },
  },
})
</script>
