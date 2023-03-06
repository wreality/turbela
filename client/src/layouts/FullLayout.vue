<template>
  <q-layout view="hhh LpR lff">
    <AppHeader @toggle-drawer="toggleLeftDrawer" />
    <q-drawer
      v-model="leftDrawerOpen"
      class="left-drawer"
      show-if-above
      bordered
      :width="220"
    >
      <AppNavigator />
    </q-drawer>
    <q-page-container style="min-height: 100vh">
      <q-toolbar class="">
        <bread-crumbs />
      </q-toolbar>
      <q-toolbar v-if="pageTitle" class="page-title">
        <q-toolbar-title>{{ pageTitle }}</q-toolbar-title>
      </q-toolbar>
      <q-separator />
      <router-view></router-view>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import BreadCrumbs from 'components/Layout/BreadCrumbs.vue'
import AppHeader from 'src/components/Layout/AppHeader.vue'
import AppNavigator from 'src/components/Layout/AppNavigator.vue'
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
const { pageTitle } = usePageTitle()

const leftDrawerOpen = ref(true)

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

function usePageTitle() {
  const $route = useRoute()

  const pageTitle = computed(() => {
    const [finalRoute] = $route.matched.slice(-1)
    return (
      finalRoute?.meta?.pageTitle ??
      finalRoute?.components?.default?.name ??
      false
    )
  })

  return { pageTitle }
}
</script>

<style lang="scss">
body.body--light {
  .left-drawer {
    background: $grey-3;
  }
  .q-page-container {
    background: white;
  }
}

body.body--dark {
  .left-drawer {
    background: $grey-10;
  }
  .q-page-container {
    .q-toolbar {
    }
  }
}
</style>
