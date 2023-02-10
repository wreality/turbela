<template>
  <q-header v-if="headerComponent === 'toolbar'" elevated>
    <q-toolbar>
      <q-btn
        v-if="hasRole()"
        flat
        dense
        round
        icon="menu"
        aria-label="Menu"
        @click="$emit('toggleDrawer')"
      ></q-btn>
      <q-toolbar-title>
        <router-link class="text-white text-bold no-decoration" to="/">{{
          generalSettings?.site_name
        }}</router-link>
      </q-toolbar-title>
      <div v-if="currentUser">
        <q-btn flat :label="currentUser.email">
          <q-menu>
            <q-list style="min-width: 100px">
              <q-item v-close-popup clickable @click="logoutUser">
                <q-item-section>Logout</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </div>
      <div v-else>
        <q-btn flat to="/login">Login</q-btn>
      </div>
    </q-toolbar>
  </q-header>
  <q-bar v-else class="q-electron-drag">
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
</template>

<script setup lang="ts">
import { SettingsKey, useSettings } from 'src/composables/settings'
import { useCurrentUser, useLogout } from 'src/composables/user'

const { logoutUser } = useLogout()

const { settings: generalSettings } = useSettings(SettingsKey.General)
const { currentUser, hasRole, can } = useCurrentUser()

const headerComponent = process.env.MODE === 'electron' ? 'menubar' : 'toolbar'

defineEmits<{
  (e: 'toggleDrawer'): void
}>()

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
