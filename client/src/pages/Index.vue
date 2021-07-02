<template>
  <q-page class="flex flex-center">
    <div v-if="isLoggedIn">
      User can
      <ul>
        <li v-if="can('search-users')">
          Search Users
        </li>
      </ul>

    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
import { useCurrentUser } from 'use/user';

export default defineComponent({
  name: 'PageIndex',
  setup() {
    const {can, isLoggedIn, currentUser} = useCurrentUser();

    return {
      can,
      isLoggedIn,
      currentUser
    }
  }
})
;
</script>
