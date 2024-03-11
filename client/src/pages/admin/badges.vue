<template>
  <router-view />
</template>

<script setup lang="ts">
definePage({
  meta: {
    crumb: {
      label: 'Badges',
      icon: 'badge',
      to: { name: 'settings:badges' },
    },
  },
})
</script>
