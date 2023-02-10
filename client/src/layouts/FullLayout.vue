<template>
  <q-layout view="hhh lpR lff">
    <AppHeader @toggle-drawer="toggleLeftDrawer" />
    <q-drawer
      v-if="hasRole()"
      v-model="leftDrawerOpen"
      class="bg-grey-2"
      show-if-above
      bordered
      :width="220"
    >
      <q-list>
        <template v-for="(menuItem, index) in availableItems" :key="index">
          <q-separator v-if="menuItem?.separator"></q-separator>
          <q-item v-else v-ripple clickable :to="menuItem.to">
            <q-item-section v-if="menuItem?.icon" avatar>
              <q-icon :name="menuItem.icon"></q-icon>
            </q-item-section>
            <q-item-section>{{ menuItem.label }}</q-item-section>
          </q-item>
        </template>
      </q-list>
    </q-drawer>
    <q-page-container class="bg-grey-3">
      <q-toolbar class="bg-grey-2">
        <bread-crumbs />
        <q-space />
        <q-btn v-if="terminal" fab @click="show">
          <div class="avatars">
            <q-avatar size="30px">
              <q-icon name="switch_account" />
            </q-avatar>
            <AvatarImage
              v-for="(user, idx) in others"
              :key="`avatar${idx}`"
              :user="user"
              bordered
              size="30px"
              class="inactive-avatar avatar"
            />
          </div>

          <AvatarImage
            v-if="currentUser"
            class="q-mx-sm"
            size="40px"
            :user="currentUser"
          />
          {{ currentUser?.name }}
        </q-btn>
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
import { useCurrentUser } from 'src/composables/user'
import AppHeader from 'src/components/AppHeader.vue'
import { computed, ref } from 'vue'
import type { RouteLocationRaw } from 'vue-router'
import { useRoute } from 'vue-router'
import { useTerminalDialog } from 'src/electron/electronSetup'
import AvatarImage from 'src/components/AvatarImage.vue'
import { useTerminalStore } from 'src/composables/terminalStore'
const { show } = useTerminalDialog()
const { others } = useTerminalStore()
const { pageTitle } = usePageTitle()
const { hasRole, can, currentUser } = useCurrentUser()
const { availableItems } = useMenuItems()
const terminal = process.env.MODE === 'electron'
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

function useMenuItems() {
  const availableItems = computed(() => {
    return menuItems.filter((v) => {
      if (v.separator === true) {
        return true
      }
      if (!v?.role && !v?.can) {
        return true
      }
      if (v?.can) {
        return can.value(v.can)
      } else if (v?.role) {
        return hasRole.value(v.role)
      }
    })
  })
  return { availableItems }
}

type MenuItems = {
  icon: string
  label: string
  to: RouteLocationRaw
  can?: string
  role?: string
  separator: false
}
type Separator = {
  separator: true
}

const menuItems: Array<MenuItems | Separator> = [
  {
    icon: 'search',
    label: 'Search Users',
    to: '/admin/users/',
    can: 'search:User',
    separator: false,
  },
  {
    separator: true,
  },
  {
    icon: 'admin_panel_settings',
    label: 'Settings',
    to: { name: 'admin:settings' },
    role: '*',
    separator: false,
  },
]
</script>
<style lang="sass" scoped>
.overlapping
  position: absolute

.inactive-avatar
  filter: grayscale(60%)
  opacity: 70%
</style>
