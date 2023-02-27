<template>
  <q-card-section>
    <div class="row">
      <q-btn
        v-for="user in users"
        :key="user.id"
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
  <q-separator />
  <q-card-section>
    <q-btn class="full-width" @click="$emit('gotoLogout')">Logout User</q-btn>
  </q-card-section>
</template>

<script lang="ts" setup>
import { onKeyStroke } from '@vueuse/core'
import type { TerminalUser } from 'src/composables/terminal'
import UserAvatar from './molecules/UserAvatar.vue'

interface Props {
  users: TerminalUser[]
}
const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'switchUser', user: TerminalUser): void
  (e: 'newLogin'): void
  (e: 'gotoLogout'): void
}>()

onKeyStroke(true, (e) => {
  if (e.code.match('Digit') || e.code.startsWith('Numpad')) {
    const num = parseInt(e.code.slice(-1))
    if (!Number.isNaN(num)) {
      if (num === 0) {
        return
      }
      if (num <= props.users.length) {
        emit('switchUser', props.users[num - 1])
      }
    }
  }
})
</script>
