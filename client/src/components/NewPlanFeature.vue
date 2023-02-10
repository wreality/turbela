<template>
  <div class="fit flex-center flex">
    <NewFeatureCard
      v-morph:card:newFeature:500.tween.resize="newFeature"
      style="width: 100%"
      @create="create"
      @cancel="cancel"
    ></NewFeatureCard>
    <q-btn
      v-morph:btn:newFeature:500.tween.resize="newFeature"
      icon="add"
      color="secondary"
      round
      size="lg"
      @click="start"
    ></q-btn>
  </div>
</template>

<script setup lang="ts">
import NewFeatureCard from './NewFeatureCard.vue'

import { ref } from 'vue'

interface Emits {
  (e: 'create', ...data: any): void
}
const emit = defineEmits<Emits>()

type MorphState = 'btn' | 'card'

const newFeature = ref<MorphState>('btn')

function start() {
  newFeature.value = 'card'
}

function create(...data: any[]) {
  newFeature.value = 'btn'
  emit('create', ...data)
}

function cancel() {
  newFeature.value = 'btn'
}
</script>
