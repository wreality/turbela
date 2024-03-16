<template>
  <q-layout
    view="hHH LpR lff"
    style="margin-top: 32px; min-height: calc(100vh - 32px)"
  >
    <PosHeader style="margin-top: 32px" />

    <q-drawer
      v-if="currentUser"
      elevated
      :model-value="true"
      persistent
      side="left"
      style="margin-top: 32px; height: calc(100% - 32px) !important"
      :width="120"
    >
      <AppNavigator pos />
    </q-drawer>

    <q-page-container v-if="currentUser" style="min-height: calc(100vh - 82px)">
      <q-scroll-area style="height: calc(100vh - 82px)">
        <q-toolbar v-if="pageTitle" class="">
          <q-toolbar-title>{{ pageTitle }}</q-toolbar-title>
        </q-toolbar>
        <q-toolbar v-if="crumbs.length" class="bordered">
          <bread-crumbs />
        </q-toolbar>
        <q-separator />
        <router-view />
      </q-scroll-area>
    </q-page-container>
    <q-page-container
      v-else
      class="locked flex flex-center"
      style="min-height: calc(100vh - 32px)"
    >
      <PosLogin />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
const { currentUser } = useCurrentUser()
const { crumbs } = useCrumbs()
const { matched } = useRoute()
const pageTitle = computed(() => {
  const route = matched.at(-1)

  return route?.meta.pageTitle ?? false
})
</script>

<style lang="scss" scoped>
body.body--light {
  .q-page-container {
    background: white;
    .q-toolbar {
      background: $grey-2;
    }
  }
  .q-page-container.locked {
    background: $blue-grey-5;
  }
}

body.body--dark {
  .q-page-container.locked {
    background: $blue-grey-10;
  }
}
</style>
