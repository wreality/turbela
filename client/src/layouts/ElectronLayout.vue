<template>
  <q-bar
    class="fixed-top q-electron-drag bg-blue-10 text-white"
    style="z-index: 1000"
  >
    <q-icon name="map" class="q-electron-drag--exception" />

    <div>Turbela Point of Sale</div>
    <q-space />

    <q-btn dense flat icon="minimize" @click="minimize" />
    <q-btn dense flat icon="crop_square" @click="toggleMaximize" />
    <q-btn dense flat icon="close" @click="closeApp" />
  </q-bar>
  <pos-layout />
</template>

<script lang="ts" setup>
import electronSetup from 'src/electron/electronSetup'
import PosLayout from 'src/layouts/PosLayout.vue'
electronSetup()

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
