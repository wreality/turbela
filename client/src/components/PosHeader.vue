<template>
  <q-header>
    <q-toolbar>
      <pos-cards-scanned />
      <q-space /><pos-user-switcher
    /></q-toolbar>
  </q-header>
</template>

<script setup lang="ts">
import PosCardsScanned from './PosCardsScanned.vue'
import PosUserSwitcher from './PosUserSwitcher.vue'
</script>

<style lang="scss" scoped>
body.body--dark {
  .q-toolbar {
    background: $indigo-10;
  }
}
</style>
