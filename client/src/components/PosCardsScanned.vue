<template>
  <q-scroll-area style="height: calc(100% - 28px)">
    <q-list separator bordered>
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
            :active="modelValue === index"
            :card="card"
            @mark-read="onMarkItemDone(index)"
            @click="onListItemClick(index)"
          />
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
    </q-list>
  </q-scroll-area>
  <q-btn
    style="position: absolute; bottom: 0px"
    :disable="!newCards.length"
    stretch
    class="full-width"
    size="sm"
    no-wrap
    color="primary"
    @click="onMarkAllDoneClick"
  >
    Mark All Done
  </q-btn>
</template>

<script lang="ts" setup>
import { useScannedCards } from 'src/composables/terminal'
import { computed } from 'vue'
import PosCardsScannedItem from './molecules/PosCardsScannedItem.vue'

interface Props {
  modelValue: number
}
const props = defineProps<Props>()

interface Emits {
  (e: 'update:model-value', value: number): void
}
const emit = defineEmits<Emits>()

const { cards: cardsScanned, update, remove, apply } = useScannedCards()

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
  onMarkItemDone(index)
  emit('update:model-value', index)
}
</script>
