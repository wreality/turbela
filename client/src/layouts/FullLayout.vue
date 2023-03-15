<template>
  <q-layout view="hhh LpR lff">
    <AppHeader @toggle-drawer="toggleLeftDrawer" />
    <q-drawer
      v-if="isLoggedIn"
      v-model="leftDrawerOpen"
      class="left-drawer"
      show-if-above
      bordered
      :width="220"
    >
      <AppNavigator />
    </q-drawer>
    <q-page-container>
      <div>
        <q-toolbar v-if="crumbs.length > 1">
          <bread-crumbs />
        </q-toolbar>
        <q-toolbar v-if="pageTitle" class="page-title">
          <q-toolbar-title>{{ pageTitle }}</q-toolbar-title>
        </q-toolbar>
        <q-resize-observer @resize="onResize" />
        <q-separator />
      </div>
      <q-page :style-fn="styleFn">
        <router-view></router-view>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import BreadCrumbs from 'components/Layout/BreadCrumbs.vue'
import AppHeader from 'src/components/Layout/AppHeader.vue'
import AppNavigator from 'src/components/Layout/AppNavigator.vue'
import { useCrumbs } from 'src/composables/breadcrumbs'
import { useCurrentUser } from 'src/composables/user'
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
const { pageTitle } = usePageTitle()

const { isLoggedIn } = useCurrentUser()
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

const headerHeight = ref(32)
function onResize({ height }: { height: number }) {
  headerHeight.value = height
}

function styleFn(offset: number) {
  const total = offset + headerHeight.value
  return {
    height: '1px',
    minHeight: total ? `calc(100vh - ${total}px)` : '100vh',
  }
}

const { crumbs } = useCrumbs()
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
}
</style>
