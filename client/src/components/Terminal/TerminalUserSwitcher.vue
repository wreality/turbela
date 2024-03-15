<template>
  <q-card-section>
    <TipBox name="unlock_login" />

    <div class="row">
      <q-btn
        v-for="user in users"
        :key="user.id"
        v-touch-hold.mouse="onBtnHold"
        class="col-3"
        flat
        @click="$emit('switchUser', user)"
      >
        <UserAvatar size="900%" :user="user" />
      </q-btn>

      <q-btn class="col-3" flat @click="$emit('newLogin')">
        <q-avatar>
          <q-icon name="add"></q-icon>
        </q-avatar>
      </q-btn>
    </div>
  </q-card-section>
  <!-- <q-separator /> -->
  <!-- <q-btn class="full-width q-py-lg" size="lg" @click="$emit('gotoLogout')"
    >Logout User</q-btn
  > -->
</template>

<script lang="ts" setup>
import type { TerminalUser } from 'src/composables/terminal'

interface Props {
  users: TerminalUser[]
}
defineProps<Props>()

const emit = defineEmits<{
  (e: 'switchUser', user: TerminalUser): void
  (e: 'newLogin'): void
  (e: 'gotoLogout'): void
}>()

function onBtnHold() {
  emit('gotoLogout')
}
</script>
