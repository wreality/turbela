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
        router-link.text-white.text-bold.no-decoration(to='/') Turbela Member System
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
      q-separator
      q-item(to='/admin/users', v-if='can("search:User")', clickable, v-ripple)
        q-item-section(avatar)
          q-icon(name='search')
        q-item-section User Search
      q-item(
        to='/admin/transactions',
        v-if='can("search:User")',
        clickable,
        v-ripple
      )
        q-item-section(avatar)
          q-icon(name='money')
        q-item-section Transactions
  q-page-container
    router-view.q-pa-md(v-slot='{ Component }')
      keep-alive(include='Users')
        component(:is='Component')
</template>

<script type="javascript">


import { defineComponent, ref } from 'vue';
import { useCurrentUser, useLogout } from 'use/user';

export default defineComponent({
  name: 'FullLayout',
  setup () {
    const {logoutUser} = useLogout();
    const {isLoggedIn, currentUser, hasRole, can } = useCurrentUser();
    const leftDrawerOpen = ref(true);
    function logout() {
      logoutUser();
    }

    function toggleLeftDrawer() {
      leftDrawerOpen.value = !leftDrawerOpen.value;
    }
    return {
      isLoggedIn,
      currentUser,
      logout,
      toggleLeftDrawer,
      leftDrawerOpen,
      hasRole,
      can
    }
  }
});
</script>
