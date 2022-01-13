<template lang="pug">
.fit.flex-center.flex
  NewFeatureCard(
    @create='create',
    v-morph:card:newFeature:500.tween.resize='newFeature',
    @cancel='cancel',
    style='width: 100%'
  )
  q-btn(
    icon='add',
    color='secondary',
    round,
    size='lg',
    v-morph:btn:newFeature:500.tween.resize='newFeature',
    @click='start'
  )
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
