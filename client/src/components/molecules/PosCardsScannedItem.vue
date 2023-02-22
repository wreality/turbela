<template>
  <q-item v-ripple clickable :active="!card.seen" active-class="bg-yellow-2">
    <q-item-section avatar>
      <div class="row justify-center items-center">
        <q-icon
          :name="!card.seen ? 'circle' : ''"
          size="10px"
          color="red"
          style="margin-left: -1em; margin-right: 0.4em"
        />
        <AvatarImage :user="{ id: '1', email: card.value }" />
      </div>
    </q-item-section>
    <q-item-section>
      {{ card.value }}
      <q-item-label caption>
        <RelativeTime class="text-no-wrap" :date-time="card.when" />
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
import type { ScannedCard } from 'src/composables/terminalStore'
import AvatarImage from '../AvatarImage.vue'
import { getCurrentInstance } from 'vue'
import { useTimeoutPoll } from '@vueuse/core'
import RelativeTime from '../atoms/RelativeTime.vue'
interface Props {
  card: ScannedCard
}
defineProps<Props>()

const instance = getCurrentInstance()

useTimeoutPoll(() => {
  instance?.proxy?.$forceUpdate()
}, 1000)
</script>
