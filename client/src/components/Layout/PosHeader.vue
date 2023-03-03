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

      <q-space /><pos-user-switcher
    /></q-toolbar>
  </q-header>
</template>

<script setup lang="ts">
import PosUserSwitcher from 'components/Terminal/TerminalSwitchUserBtn.vue'
import {
  useScannedCards,
  useScannedCardsDialog,
} from 'src/composables/terminal'
import { useCurrentUser } from 'src/composables/user'
import { computed } from 'vue'

const { currentUser } = useCurrentUser()
const { cards } = useScannedCards()
const newCards = computed(() => cards.value.filter((v) => !v.seen))

const { show } = useScannedCardsDialog()
</script>

<style lang="scss" scoped>
body.body--dark {
  .q-toolbar {
    background: $indigo-10;
  }
}
</style>
