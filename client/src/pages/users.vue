<template>
  <router-view v-slot="{ Component }" class="">
    <keep-alive include="UsersSearch">
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>

<script setup lang="ts">
definePage({
  redirect: { name: 'users:search' },
  meta: {
    requiresAbility: 'search:User',
    crumb: { label: 'Users', icon: 'people' },
  },
})
</script>
