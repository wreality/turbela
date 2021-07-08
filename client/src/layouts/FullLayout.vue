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
      div(v-if='isLoggedIn')
        q-btn(flat='', :label='currentUser.email')
          q-menu
            q-list(style='min-width: 100px')
              q-item(v-close-popup='', clickable='', @click='logout')
                q-item-section Logout
      div(v-else='')
        q-btn(flat='', to='/login') Login
  q-drawer.bg-grey-2(
    v-if='hasRole()',
    v-model='leftDrawerOpen',
    show-if-above,
    bordered,
    :width='220'
  )
    q-list
      template(v-for='(menuItem, index) in menuItems', :key='index')
        q-item(
          clickable,
          :to='menuItem.to',
          v-ripple,
          v-if='menuItem?.label && isVisibleItem(menuItem)'
        )
          q-item-section(v-if='menuItem?.icon', avatar)
            q-icon(:name='menuItem.icon')
          q-item-section {{ menuItem.label }}
        q-separator(v-if='menuItem?.separator')
  q-page-container
    q-toolbar.bg-grey-2(v-if='pageTitle')
      q-toolbar-title {{ pageTitle }}
    q-toolbar.bg-grey-2(inset)
      breadcrumbs
    router-view
</template>

<script>
import { defineComponent, ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useCurrentUser, useLogout } from 'use/user'
import { useSettings } from 'use/settings'
import Breadcrumbs from 'components/molecules/Breadcrumbs.vue'
const menuItems = [
  {
    icon: 'search',
    label: 'Search Users',
    to: '/admin/users/',
    can: 'search:User',
  },
  {
    separator: true,
  },
  {
    icon: 'admin_panel_settings',
    label: 'Settings',
    to: { name: 'admin:settings' },
    roles: '*',
  },
]
export default defineComponent({
  name: 'FullLayout',
  components: { Breadcrumbs },
  setup() {
    const { logoutUser } = useLogout()
    const { isLoggedIn, currentUser, hasRole, can } = useCurrentUser()
    const leftDrawerOpen = ref(true)
    function logout() {
      logoutUser()
    }

    function toggleLeftDrawer() {
      leftDrawerOpen.value = !leftDrawerOpen.value
    }

    const isVisibleItem = computed(() => {
      return (menuItem) => {
        let visible = true
        if (menuItem?.role && !hasRole.value(menuItem.role)) {
          visible = false
        }
        if (menuItem?.can && !can.value(menuItem.can)) {
          visible = false
        }
        return visible
      }
    })

    const { generalSettings } = useSettings()

    return {
      isLoggedIn,
      currentUser,
      logout,
      toggleLeftDrawer,
      leftDrawerOpen,
      hasRole,
      can,
      menuItems,
      isVisibleItem,
      generalSettings,
      ...usePageTitle(),
    }
  },
})

const usePageTitle = () => {
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
</script>
