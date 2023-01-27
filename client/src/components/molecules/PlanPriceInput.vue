<template lang="pug">
div(v-for='(model, index) in prices')
  PriceInput(
    :modelValue='model',
    @update:modelValue='onUpdate',
    :index='index'
  )
</template>
<script setup lang="ts">
import { ref, watch, toRef } from 'vue'
import type { Price } from 'src/generated/graphql'
import PriceInput from './PriceInput.vue'

interface Props {
  modelValue: Array<Price | {}>
}
const props = defineProps<Props>()

const prices = ref<Array<Price | {}>>([])
interface Emits {
  (e: 'update:modelValue', value: Array<Price | {}>): void
}
const emit = defineEmits<Emits>()
watch(
  () => props.modelValue,
  () => {
    const newValue = props.modelValue
    if (newValue.length === 0) {
      prices.value = [{}]
    } else {
      prices.value = [...newValue]
    }
  },
  { immediate: true }
)
watch(
  prices,
  () => {
    emit('update:modelValue', prices.value)
  },
  { deep: true }
)

function onUpdate(index: number, price: Price | {}) {
  prices.value.splice(index, 1, price)
}
</script>
