<template>
  <q-card flat class="q-dialog-plugin" style="width: 700px">
    <TerminalUserSwitcher
      v-if="users.length && mode === 'switcher'"
      :users="users"
      @switch-user="handleSwitchUser"
      @new-login="mode = 'newLogin'"
      @goto-logout="mode = 'logout'"
    />
    <TerminalUserLogin
      v-if="mode === 'newLogin'"
      @user-login="handleUserLogin"
      @cancel-login="handleCancelLogin"
    />
    <TerminalUserVerify
      v-if="mode === 'verifyUser'"
      :user="selectedUser as TerminalUser"
      @confirm-user="verifyUser"
      @cancel-verify="handleCancelVerify"
    />
    <TerminalUserLogout
      v-if="mode === 'logout'"
      @done="mode = 'switcher'"
      @empty="mode = 'newLogin'"
    />
  </q-card>
</template>

<script setup lang="ts">
import type { TerminalUser } from 'src/composables/terminal'

const mode = ref('switcher')

const { users, token } = useTerminalStore()
const selectedUser = ref<null | TerminalUser>(null)

if (users.value.length === 0) {
  mode.value = 'newLogin'
}

function verifyUser(user: TerminalUser) {
  token.value = user.token
}

function handleSwitchUser(user: TerminalUser) {
  selectedUser.value = user
  mode.value = 'verifyUser'
}

function handleUserLogin(user: TerminalUser) {
  const existingUser = users.value.findIndex((v) => v.id === user.id)
  if (existingUser === -1) {
    users.value.push(user)
  } else {
    users.value[existingUser] = user
  }
  mode.value = 'verifyUser'
  selectedUser.value = user
}

function handleCancelVerify() {
  mode.value = 'switcher'
  selectedUser.value = null
}

function handleCancelLogin() {
  if (users.value.length > 0) {
    mode.value = 'switcher'
  }
}
</script>
