<template>
  <q-layout view="hhh lpR lff">
    <AppHeader @toggle-drawer="toggleLeftDrawer" />
    <q-drawer
      v-model="leftDrawerOpen"
      class="bg-grey-2"
      show-if-above
      bordered
      :width="220"
    >
      <AppNavigator />
    </q-drawer>
    <q-page-container class="bg-grey-3">
      <q-toolbar class="bg-grey-2">
        <bread-crumbs />
      </q-toolbar>
      <q-toolbar v-if="pageTitle" class="bg-grey-2 shadow-1">
        <q-toolbar-title>{{ pageTitle }}</q-toolbar-title>
      </q-toolbar>
      <router-view></router-view>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import BreadCrumbs from 'components/molecules/BreadCrumbs.vue'
import AppHeader from 'src/components/AppHeader.vue'
import AppNavigator from 'src/components/AppNavigator.vue'
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
