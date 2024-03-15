<template>
  <q-item
    v-ripple
    clickable
    :class="{ unread: !card.seen }"
    active-class="active"
  >
    <q-card-section
      side
      style="margin-left: -10px; margin-right: 4px"
      class="q-px-none"
    >
      <q-icon color="orange-10" size="8px" :name="card.seen ? '' : 'circle'" />
    </q-card-section>
    <component :is="itemComponent" :card="props.card">
      <template #when>
        <RelativeTime class="text-no-wrap" :date-time="card.when" />
      </template>
    </component>
  </q-item>
</template>

<script setup lang="ts">
import type { ScannedCard } from 'src/composables/terminal'
import PosScannedUser from './PosScannedUser.vue'

interface Props {
  card: ScannedCard
}
const props = defineProps<Props>()

interface Emits {
  (e: 'markRead'): void
}
defineEmits<Emits>()

const itemComponent = computed(() => {
  switch (props.card.lookup?.target?.__typename) {
    case 'User':
      return PosScannedUser
    default:
      return null
  }
})
</script>

<style lang="scss" scoped>
body.body--light {
  .q-item.active {
    background: $blue-1;
  }
  .q-item.unread {
    background: $yellow-2;
  }
}
</style>
