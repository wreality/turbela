<template>
  <router-view v-slot="{ Component }" class="">
    <keep-alive include="UsersSearch">
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>
