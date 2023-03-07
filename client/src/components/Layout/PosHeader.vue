<template>
  <q-header>
    <q-toolbar>
      <q-btn
        flat
        icon="scanner"
        :disable="!currentUser"
        size="lg"
        @click="show"
      >
        <q-badge v-if="newCards.length" color="red" floating>
          {{ newCards.length }}
        </q-badge>
      </q-btn>
      <div class="col">
        <div style="max-width: 600px; margin: 0 auto">
          <user-search-bar />
        </div>
      </div>
      <pos-user-switcher />
    </q-toolbar>
  </q-header>
</template>

<script setup lang="ts">
import PosUserSwitcher from 'components/Terminal/TerminalSwitchUserBtn.vue'
import {
  useScannedCards,
  useScannedCardsDialog,
} from 'src/composables/terminal'
import { useCurrentUser } from 'src/composables/user'
import { computed, ref } from 'vue'
import UserSearchBar from './UserSearchBar.vue'

const { currentUser } = useCurrentUser()
const { cards } = useScannedCards()
const newCards = computed(() => cards.value.filter((v) => !v.seen))

const { show } = useScannedCardsDialog()
const search = ref('')
</script>

<style lang="scss" scoped>
body.body--dark {
  .q-toolbar {
    background: $indigo-10;
  }
}
</style>
