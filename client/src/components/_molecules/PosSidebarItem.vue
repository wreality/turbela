<template>
  <q-item v-ripple clickable :to="menuItem.to" exact>
    <q-item-section
      v-if="menuItem?.icon"
      class="text-center column text-uppercase"
    >
      <div><q-icon :name="menuItem.icon" size="xl"></q-icon></div>

      <div>{{ menuItem.label }}</div>
    </q-item-section>
  </q-item>
</template>

<script lang="ts" setup>
import type { RouteLocationRaw } from 'vue-router/auto'

interface Props {
  menuItem: MenuItem
}
defineProps<Props>()

type MenuItem = {
  icon: string
  label: string
  to: RouteLocationRaw
  can?: string
  role?: string
  separator?: boolean
  space?: boolean
}
</script>
