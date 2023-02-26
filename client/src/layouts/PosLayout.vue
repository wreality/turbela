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
    <!-- <q-drawer
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
    </q-drawer> -->

    <q-page-container
      v-if="currentUser"
      class="bg-grey-3"
      style="min-height: calc(100vh - 82px)"
    >
      <q-scroll-area style="height: calc(100vh - 82px)">
        <q-toolbar v-if="pageTitle" class="bg-grey-2 shadow-1">
          <q-toolbar-title>{{ pageTitle }}</q-toolbar-title>
        </q-toolbar>
        <q-toolbar class="bg-grey-2 bordered">
          <bread-crumbs />
        </q-toolbar>

        <router-view />
      </q-scroll-area>
    </q-page-container>
    <q-page-container
      v-else
      class="bg-blue-2 flex flex-center"
      style="min-height: calc(100vh - 32px)"
    >
      <q-icon name="lock" size="200px" color="grey-7" @click="onLockClick" />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import BreadCrumbs from 'components/molecules/BreadCrumbs.vue'
import AppNavigator from 'src/components/AppNavigator.vue'
import PosHeader from 'src/components/PosHeader.vue'
import { useTerminalDialog, useTerminalScanner } from 'src/composables/terminal'
import { useCurrentUser } from 'src/composables/user'
import electronSetup from 'src/electron/electronSetup'
import { computed, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'

const { currentUser } = useCurrentUser()

const { matched } = useRoute()
const pageTitle = computed(() => {
  const route = matched.at(-1)

  return route?.meta.pageTitle ?? false
})

electronSetup()

onUnmounted(
  useTerminalScanner('RFID', (_, __, lookup) => {
    if (!lookup) {
      return
    }
    if (lookup.target?.__typename === 'User') {
    }
  })
)
const { show } = useTerminalDialog()
function onLockClick() {
  show()
}
</script>
