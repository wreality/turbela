<template>
  <q-item
    v-ripple
    clickable
    :active="!card.seen"
    active-class="bg-yellow-2"
    @click="onItemClick"
  >
    <component :is="itemComponent" :card="card">
      <template #when>
        <RelativeTime class="text-no-wrap" :date-time="card.when" />
      </template>
    </component>
  </q-item>
</template>

<script setup lang="ts">
import type { ScannedCard } from 'src/composables/terminal'
import PosScannedUser from './PosScannedUser.vue'
import RelativeTime from '../atoms/RelativeTime.vue'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

interface Props {
  card: ScannedCard
}
const props = defineProps<Props>()

interface Emits {
  (e: 'markRead'): void
}
const emit = defineEmits<Emits>()

const itemComponent = computed(() => {
  switch (props.card.lookup?.target?.__typename) {
    case 'User':
      return PosScannedUser
    default:
      return null
  }
})

const { push } = useRouter()
function onItemClick() {
  switch (props.card.lookup?.target?.__typename) {
    case 'User':
      emit('markRead')
      push({
        name: 'admin:users:view',
        params: { id: props.card.lookup.target.id },
      })
      return
  }
}
</script>
