<template>
  <router-view v-slot="{ Component }" class="">
    <keep-alive include="UsersSearch">
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>

<route lang="json">
{
  "meta": {
    "requiresAbility": "search:User",
    "crumb": { "label": "Users", "icon": "people" }
  }
}
</route>
