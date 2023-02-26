<template>
  <q-btn flat @click="show">
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
    <div v-if="currentUser">
      <AvatarImage class="q-mx-sm" size="40px" :user="currentUser" />
      {{ currentUser?.name }}
    </div>
    <div v-else class="q-pl-sm">Login</div>
  </q-btn>
</template>

<script lang="ts" setup>
import AvatarImage from 'src/components/AvatarImage.vue'

import { useTerminalDialog, useTerminalStore } from 'src/composables/terminal'
import { useCurrentUser } from 'src/composables/user'

const { show } = useTerminalDialog()
const { others } = useTerminalStore()
const { currentUser } = useCurrentUser()
</script>

<style lang="sass" scoped>
.overlapping
  position: absolute

.inactive-avatar
  filter: grayscale(60%)
  opacity: 70%
</style>
