<template>
  <q-page class="flex flex-center">
    <div v-if="isLoggedIn">
      User can
      {{ currentUser }}
      <ul>
        <li v-if="can('search-users')">Search Users</li>
      </ul>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { useCurrentUser } from 'src/composables/user'
const { can, isLoggedIn, currentUser } = useCurrentUser()
</script>
