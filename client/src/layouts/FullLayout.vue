<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>

        <q-toolbar-title>
          Turbela Member System
        </q-toolbar-title>
        <div v-if="isLoggedIn">
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
          <q-btn flat to="/login">Login</q-btn>
        </div>
      </q-toolbar>
    </q-header>



    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script type="javascript">


import { defineComponent } from 'vue';
import { useCurrentUser, useIsLoggedIn, useLogout } from 'use/user';

export default defineComponent({
  name: 'FullLayout',
  setup () {
    const {logoutUser} = useLogout();

    function logout() {
      logoutUser();
    }
    return {
      ...useCurrentUser(),
      ...useIsLoggedIn(),
      logout
    }
  }
});


</script>
