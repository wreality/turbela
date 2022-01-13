<template lang="pug">
q-layout(view='hhh lpR lff')
  q-header(elevated)
    q-toolbar
      q-btn(
        v-if='hasRole()',
        flat,
        dense,
        round,
        icon='menu',
        aria-label='Menu',
        @click='toggleLeftDrawer'
      )
      q-toolbar-title
        router-link.text-white.text-bold.no-decoration(to='/') {{ generalSettings?.site_name }}
      div(v-if='currentUser')
        q-btn(flat, :label='currentUser.email')
          q-menu
            q-list(style='min-width: 100px')
              q-item(v-close-popup, clickable, @click='logoutUser')
                q-item-section Logout
      div(v-else)
        q-btn(flat, to='/login') Login
  q-drawer.bg-grey-2(
    v-if='hasRole()',
    v-model='leftDrawerOpen',
    show-if-above,
    bordered,
    :width='220'
  )
    q-list
      template(v-for='(menuItem, index) in availableItems', :key='index')
        q-separator(v-if='menuItem?.separator')
        q-item(clickable, :to='menuItem.to', v-ripple, v-else)
          q-item-section(v-if='menuItem?.icon', avatar)
            q-icon(:name='menuItem.icon')
          q-item-section {{ menuItem.label }}
  q-page-container
    q-toolbar.bg-grey-2
      bread-crumbs
    q-toolbar.bg-grey-2.shadow-1(v-if='pageTitle')
      q-toolbar-title {{ pageTitle }}
    router-view
</template>

<script setup lang="ts">
import BreadCrumbs from 'components/molecules/BreadCrumbs.vue'
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useCurrentUser, useLogout } from 'src/composables/user'
import { useSettings } from 'src/composables/settings'
import type { RouteLocationRaw } from 'vue-router'
import type { GeneralSettings } from 'src/generated/graphql'
import type { Ref } from 'vue'
const { generalSettings }: { generalSettings: Ref<GeneralSettings> } =
  useSettings()
const { currentUser, hasRole, can } = useCurrentUser()

const { pageTitle } = usePageTitle()

const { logoutUser } = useLogout()

const { availableItems } = useMenuItems()

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
