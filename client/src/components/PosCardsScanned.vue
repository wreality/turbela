<template>
  <q-btn-dropdown dense auto-close icon="scanner" :disable="!currentUser">
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
          @left="(details) => onToggleItemDone(index, details)"
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
          <PosCardsScannedItem
            v-close-popup
            :card="card"
            @mark-read="onMarkItemDone(index)"
            @click="onListItemClick(index)"
          />
          <q-separator />
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
import { useScannedCards, useTerminalSerial } from 'src/composables/terminal'
import { useCurrentUser } from 'src/composables/user'
import { computed } from 'vue'
import PosCardsScannedItem from './molecules/PosCardsScannedItem.vue'

const { currentUser } = useCurrentUser()
const { cards: cardsScanned, update, remove, apply } = useScannedCards()
const { handle } = useTerminalSerial()

const newCards = computed(() => cardsScanned.value.filter(({ seen }) => !seen))

function onToggleItemDone(index: number, details: { reset: () => void }) {
  details.reset()
  update(index, { seen: !cardsScanned.value[index].seen })
}

function onMarkItemDone(index: number) {
  update(index, { seen: true })
}

function onDeleteItem(index: number, { reset }: { reset: () => void }) {
  remove(index)
  reset()
}

function onMarkAllDoneClick() {
  apply({ seen: true })
}
function onListItemClick(index: number) {
  if (!cardsScanned.value[index]) {
    return
  }
  onMarkItemDone(index)
  handle(
    '',
    '',
    cardsScanned.value[index].channel,
    cardsScanned.value[index].value,
    true
  )
}
</script>
