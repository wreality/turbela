<template>
  <router-view v-slot="{ Component }" class="q-pa-md">
    <keep-alive include="UsersSearch">
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>
