<template>
  <q-btn-dropdown dense icon="scanner">
    <template #label>
      <q-badge v-if="newCards.length" color="red" floating>
        {{ newCards.length }}
      </q-badge>
    </template>
    <q-list style="min-width: 20vw">
      <template v-if="cardsScanned.length">
        <q-slide-item
          v-for="(card, index) in cardsScanned"
          :key="`cardScanned${index}`"
          @left="(details) => onMarkItemDone(index, details)"
          @right="(details) => onDeleteItem(index, details)"
        >
          <template #left>
            <div class="row items-center">
              <template v-if="!card.seen">
                <q-icon left name="done" /> Done
              </template>
              <template v-else> <q-icon left name="circle" /> Mark </template>
            </div>
          </template>
          <template #right>
            <div class="row items-center">
              <q-icon left name="clear" /> Clear
            </div>
          </template>
          <PosCardsScannedItem :card="card" />
        </q-slide-item>
      </template>
      <template v-else>
        <q-item>
          <q-item-section avatar><q-icon name="clear" /></q-item-section>
          <q-item-section>
            <q-item-label> No recent card scans </q-item-label>
          </q-item-section>
        </q-item>
      </template>
      <q-separator />
      <q-btn
        :disable="!newCards.length"
        stretch
        class="full-width"
        size="sm"
        no-wrap
        flat
        @click="onMarkAllDoneClick"
        >Mark All Done</q-btn
      >
    </q-list>
  </q-btn-dropdown>
</template>

<script lang="ts" setup>
import { useTerminalStore } from 'src/composables/terminalStore'
import { computed } from 'vue'

import PosCardsScannedItem from './molecules/PosCardsScannedItem.vue'

const { cardsScanned } = useTerminalStore()

const newCards = computed(() => cardsScanned.value.filter(({ seen }) => !seen))

function onMarkItemDone(index: number, { reset }: { reset: () => void }) {
  reset()
  cardsScanned.value[index].seen = !cardsScanned.value[index].seen
}

function onDeleteItem(index: number, { reset }: { reset: () => void }) {
  cardsScanned.value.splice(index, 1)
  reset()
}

function onMarkAllDoneClick() {
  cardsScanned.value.forEach((v) => (v.seen = true))
}
</script>
