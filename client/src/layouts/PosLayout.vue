<template>
  <q-layout view="hHH LpR lff" style="margin-top: 32px">
    <PosHeader style="margin-top: 32px" />

    <q-drawer
      elevated
      :model-value="true"
      persistent
      side="left"
      style="margin-top: 32px; height: calc(100% - 32px) !important"
      :width="120"
    >
      <AppNavigator pos />
    </q-drawer>
    <q-drawer
      :model-value="false"
      bordered
      side="right"
      class="bg-grey-10 q-pa-sm"
      style="margin-top: 32px; height: calc(100% - 32px) !important"
      :width="430"
    >
      <div class="column text-white q-gutter-md">
        <div class="text-h4 text-white text-center">Cart</div>
        <q-list>
          <q-item dense>
            <q-item-section> 3/4 Panel </q-item-section>
            <q-item-section class="text-white" side> $12.99 </q-item-section>
          </q-item>
          <q-item dense>
            <q-item-section> 3/4 Panel </q-item-section>
            <q-item-section class="text-white" side> $12.99 </q-item-section>
          </q-item>
          <q-item dense>
            <q-item-section> 3/4 Panel </q-item-section>
            <q-item-section class="text-white" side> $12.99 </q-item-section>
          </q-item>
          <q-separator color="white" />
          <q-item>
            <q-item-section class="text-uppercase text-bold"
              >Total</q-item-section
            >
            <q-item-section class="text-bold text-white" side>
              $12.99
            </q-item-section>
          </q-item>
        </q-list>
        <div class="q-pa-md">
          <div class="row q-gutter-sm">
            <q-btn size="xl" color="primary">Card</q-btn>
            <q-btn size="xl" color="primary">Check</q-btn>
            <q-btn size="xl" color="primary">Cash</q-btn>
          </div>
        </div>
      </div>
    </q-drawer>

    <q-page-container class="bg-grey-3" style="min-height: 100vh">
      <q-toolbar v-if="pageTitle" class="bg-grey-2 shadow-1">
        <q-toolbar-title>{{ pageTitle }}</q-toolbar-title>
      </q-toolbar>
      <q-toolbar class="bg-grey-2 bordered">
        <bread-crumbs />
      </q-toolbar>
      <router-view></router-view>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import BreadCrumbs from 'components/molecules/BreadCrumbs.vue'
import AppNavigator from 'src/components/AppNavigator.vue'
import PosHeader from 'src/components/PosHeader.vue'
import { computed, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import electronSetup from 'src/electron/electronSetup'
import { useTerminalScanner } from 'src/composables/terminal'
const { pageTitle } = usePageTitle()

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

electronSetup()

onUnmounted(
  useTerminalScanner('RFID', (_, token, lookup) => {
    if (!lookup) {
      return
    }
    if (lookup.target?.__typename === 'User') {
    }
  })
)
</script>
