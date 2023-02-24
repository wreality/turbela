<template>
  <q-dialog
    ref="dialogRef"
    position="top"
    :persistent="true"
    @hide="onDialogHide"
  >
    <q-card class="q-dialog-plugin" style="width: 700px">
      <TerminalUserSwitcher
        v-if="users.length && mode === 'switcher'"
        :users="users"
        @switch-user="handleSwitchUser"
        @new-login="mode = 'newLogin'"
        @goto-logout="mode = 'logout'"
      />
      <TerminalNewLogin
        v-if="mode === 'newLogin'"
        @user-login="handleUserLogin"
      />
      <TerminalVerifyUser
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
  </q-dialog>
</template>

<script setup lang="ts">
import { useDialogPluginComponent } from 'quasar'
import TerminalVerifyUser from 'src/components/TerminalVerifyUser.vue'
import { useTerminalStore } from 'src/composables/terminal'
import type { TerminalUser } from 'src/composables/terminal'
import { ref } from 'vue'
import TerminalNewLogin from '../TerminalNewLogin.vue'
import TerminalUserSwitcher from '../TerminalUserSwitcher.vue'
import TerminalUserLogout from '../TerminalUserLogout.vue'
const mode = ref('switcher')

const { users, token } = useTerminalStore()
const selectedUser = ref<null | TerminalUser>(null)

if (users.value.length === 0) {
  mode.value = 'newLogin'
}

function verifyUser(user: TerminalUser) {
  token.value = user.token
  onDialogOK()
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
  verifyUser(user)
}

function handleCancelVerify() {
  mode.value = 'switcher'
  selectedUser.value = null
}

defineEmits([
  // REQUIRED; need to specify some events that your
  // component will emit through useDialogPluginComponent()
  ...useDialogPluginComponent.emits,
])

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
  useDialogPluginComponent()
// dialogRef      - Vue ref to be applied to QDialog
// onDialogHide   - Function to be used as handler for @hide on QDialog
// onDialogOK     - Function to call to settle dialog with "ok" outcome
//                    example: onDialogOK() - no payload
//                    example: onDialogOK({ /*...*/ }) - with payload
// onDialogCancel - Function to call to settle dialog with "cancel" outcome

// this is part of our example (so not required)
function onOKClick() {
  // on OK, it is REQUIRED to
  // call onDialogOK (with optional payload)
  onDialogOK()
  // or with payload: onDialogOK({ ... })
  // ...and it will also hide the dialog automatically
}
</script>
