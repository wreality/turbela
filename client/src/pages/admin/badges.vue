<template>
  <router-view />
</template>

<script setup lang="ts">
import { definePage } from 'vue-router/auto'

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
