<template>
  <q-card-section>
    <TipBox name="logout_terminal" />
    <div class="row q-gutter-sm">
      <div
        v-for="user in users"
        :key="user.id"
        flat
        class="col-3"
        style="position: relative; padding: 4px 16px"
      >
        <q-btn
          icon="close"
          size="sm"
          round
          style="position: absolute; z-index: 1000; top: 10px; left: 10px"
          color="negative"
          @click="handleLogout(user)"
        />
        <UserAvatar
          class="shake-mine shake-constant"
          size="900%"
          :user="user"
        />
        <p class="text-uppercase text-bold text-center">{{ user.name }}</p>
      </div>
    </div>
  </q-card-section>
  <q-separator />
  <q-btn flat class="full-width q-py-sm" size="lg" @click="$emit('done')"
    >Done</q-btn
  >
</template>

<script lang="ts" setup>
import { TerminalUser, useTerminalMutation } from 'src/composables/terminal'
import { useTerminalStore } from 'src/composables/terminal/store'
import { LogoutTerminalUserDocument } from 'src/generated/graphql'

const { users } = useTerminalStore()

const emit = defineEmits<{
  (e: 'done'): void
  (e: 'empty'): void
}>()

const { mutate: logout } = useTerminalMutation(LogoutTerminalUserDocument)

const { dialog } = useQuasar()
async function handleLogout(user: TerminalUser) {
  dialog({
    message: 'Are you sure you want to logout?',
    title: 'Confirm Logout',
    cancel: true,
  }).onOk(async () => {
    await logout({ id: user.id })
    users.value.splice(
      users.value.findIndex((u) => u.id === user.id),
      1
    )

    if (users.value.length === 0) {
      emit('empty')
    }
  })
}
</script>

<script lang="ts">
import { gql } from 'graphql-tag'
import { useQuasar } from 'quasar'
import UserAvatar from '../User/UserAvatar.vue'
import TipBox from '../_molecules/TipBox.vue'
gql`
  mutation LogoutTerminalUser($id: ID!) {
    logoutTerminalUser(id: $id) {
      id
    }
  }
`
</script>

<style lang="scss" scoped></style>
