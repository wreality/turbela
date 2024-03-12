<template>
  <router-view />
</template>

<script setup lang="ts">
definePage({
  redirect: { name: 'badges:index' },
  meta: {
    crumb: { label: 'Badges', icon: 'sym_o_award_star' },
  },
})
</script>

<style scoped></style>
