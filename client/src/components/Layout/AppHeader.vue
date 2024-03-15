<template>
  <q-header>
    <q-toolbar color="secondary">
      <q-btn v-if="hasRole()" flat dense round icon="menu" aria-label="Menu">
        <AppNavigator />
      </q-btn>
      <q-toolbar-title class="col-auto">
        <router-link class="text-white text-bold no-decoration" to="/">
          {{ generalSettings?.site_name }}
        </router-link>
      </q-toolbar-title>
      <div v-if="currentUser" class="col">
        <div style="max-width: 600px; margin: 0 auto">
          <user-search-bar />
        </div>
      </div>
      <q-space v-else />
      <div v-if="currentUser">
        <volunteer-header-badge :user="currentUser" />
        <q-btn flat :label="currentUser.email">
          <q-menu>
            <q-list style="min-width: 100px">
              <q-item v-close-popup clickable @click="logout">
                <q-item-section>Logout</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </div>
      <div v-else>
        <q-btn flat @click="login">Login</q-btn>
      </div>
    </q-toolbar>
  </q-header>
</template>

<script setup lang="ts">
import { SettingsKey, useSettings } from 'src/composables/settings'

const { settings: generalSettings } = useSettings(SettingsKey.General)
const { currentUser, hasRole } = useCurrentUser()

const { keycloak } = useAuthentication()

const login = () => {
  keycloak.login()
}

const logout = () => {
  keycloak.logout()
}

defineEmits<{
  (e: 'toggleDrawer'): void
}>()
</script>

<style lang="scss" scoped>
body.body--dark {
  .q-toolbar {
    background: $indigo-10;
  }
}
</style>
