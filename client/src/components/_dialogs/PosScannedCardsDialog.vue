<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card style="width: 900px; height: 600px; max-width: 100vw" class="">
      <div class="column full-height">
        <q-card-section horizontal class="col q-pa-none">
          <q-card-section class="col-4 full-height q-pa-none">
            <CardsScanned v-model="activeCardIndex" />
          </q-card-section>
          <q-separator vertical />
          <q-card-section class="col q-pa-none">
            <component
              :is="viewComponent"
              v-if="activeCardIndex !== null && viewComponent"
              :card="cards[activeCardIndex]?.lookup?.target"
            />
          </q-card-section>
        </q-card-section>
      </div>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import CardsScanned from 'components/ScannedCards/CardsScanned.vue'
import { useDialogPluginComponent } from 'quasar'
import { useScannedCards } from 'src/composables/terminal'
import { computed, ref } from 'vue'
import ScannedUser from '../ScannedCards/ScannedUser.vue'

const activeCardIndex = ref(0)
defineEmits([
  // REQUIRED; need to specify some events that your
  // component will emit through useDialogPluginComponent()
  ...useDialogPluginComponent.emits,
])

const { dialogRef, onDialogHide } = useDialogPluginComponent()

const { cards } = useScannedCards()

const viewComponent = computed(() => {
  if (activeCardIndex.value === null) {
    return null
  }
  switch (cards.value[activeCardIndex.value]?.lookup?.target?.__typename) {
    case 'User':
      return ScannedUser
  }
  return null
})
</script>

<style scoped></style>
