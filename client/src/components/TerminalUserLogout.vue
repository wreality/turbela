<template>
  <q-card-section>
    <div class="column q-gutter-sm">
      <q-btn
        v-for="user in users"
        :key="user.id"
        align="around"
        class="full-width"
        outline
        :color="selectedUser?.id === user.id ? 'negative' : ''"
        @click="handleLogout(user)"
      >
        <AvatarImage size="900%" :user="user" />
        {{ selectedUser?.id === user.id ? 'Confirm Logout' : 'Logout' }}
      </q-btn>
    </div>
  </q-card-section>
  <q-separator />
  <q-card-actions>
    <q-btn flat class="full-width" @click="$emit('done')">Done</q-btn>
  </q-card-actions>
</template>

<script lang="ts" setup>
import { TerminalUser, useTerminalMutation } from 'src/electron/electronSetup'
import AvatarImage from './AvatarImage.vue'
import { ref } from 'vue'
import { useTerminalStore } from 'src/composables/terminalStore'

const { users } = useTerminalStore()

const emit = defineEmits<{
  (e: 'done'): void
  (e: 'empty'): void
}>()

const { mutate: logout } = useTerminalMutation(LogoutTerminalUserDocument)

const selectedUser = ref<null | TerminalUser>(null)
async function handleLogout(user: TerminalUser) {
  if (!selectedUser.value) {
    selectedUser.value = user
    return
  }

  if (selectedUser.value.id !== user.id) {
    selectedUser.value = user
    return
  }

  if (selectedUser.value.id === user.id) {
    await logout({ id: user.id })
    users.value = users.value.filter((u) => u.id !== user.id)
    selectedUser.value = null
    if (users.value.length === 0) {
      emit('empty')
    }
    return
  }
}
</script>

<script lang="ts">
import { gql } from 'graphql-tag'
import { LogoutTerminalUserDocument } from 'src/generated/graphql'
gql`
  mutation LogoutTerminalUser($id: ID!) {
    logoutTerminalUser(id: $id) {
      id
    }
  }
`
</script>
