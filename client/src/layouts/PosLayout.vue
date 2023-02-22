<template>
  <q-layout view="hHH LpR lff">
    <PosHeader />

    <q-drawer elevated :model-value="true" persistent side="left" :width="120">
      <AppNavigator pos />
    </q-drawer>
    <q-drawer
      :model-value="true"
      bordered
      side="right"
      class="bg-grey-10 q-pa-sm"
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
      {{ cardsScanned }}
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import BreadCrumbs from 'components/molecules/BreadCrumbs.vue'
import AppNavigator from 'src/components/AppNavigator.vue'
import PosUserSwitcher from 'src/components/PosUserSwitcher.vue'
import PosHeader from 'src/components/PosHeader.vue'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { electronSetup } from 'src/electron/electronSetup'
import { useTerminalStore } from 'src/composables/terminalStore'
const { pageTitle } = usePageTitle()

const { cardsScanned } = useTerminalStore()

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
</script>
