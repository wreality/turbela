<template>
  <q-header>
    <q-bar class="q-electron-drag">
      <q-icon name="map" class="q-electron-drag--exception" />

      <div>Turbela Point of Sale</div>
      <q-space />
      <q-btn
        class="q-mr-md"
        color="secondary"
        dense
        :icon="$q.fullscreen.isActive ? 'fullscreen_exit' : 'fullscreen'"
        :label="$q.fullscreen.isActive ? 'Exit Fullscreen' : 'Go Fullscreen'"
        @click="$q.fullscreen.toggle()"
      />

      <q-btn dense flat icon="minimize" @click="minimize" />
      <q-btn dense flat icon="crop_square" @click="toggleMaximize" />
      <q-btn dense flat icon="close" @click="closeApp" />
    </q-bar>
    <q-toolbar>
      <pos-cards-scanned />
      <q-space /><pos-user-switcher
    /></q-toolbar>
  </q-header>
</template>

<script setup lang="ts">
import PosCardsScanned from './PosCardsScanned.vue'
import PosUserSwitcher from './PosUserSwitcher.vue'

function minimize() {
  if (process.env.MODE === 'electron') {
    window.turbela.minimize()
  }
}

function toggleMaximize() {
  if (process.env.MODE === 'electron') {
    window.turbela.toggleMaximize()
  }
}

function closeApp() {
  if (process.env.MODE === 'electron') {
    window.turbela.close()
  }
}
</script>

<script lang="ts"></script>
