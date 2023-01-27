<template lang="pug">
q-input(v-model='amount', label='Price', outlined, :error='!valid')
  template(#error)
    | A valid price is required (0 is a valid price)
  template(#prepend)
    | $
  template(#after)
    q-select(
      v-model='currency',
      label='Currency',
      outlined,
      :options='["USD"]'
    )
</template>

<script setup lang="ts">
import { ref, watch, watchEffect, computed, nextTick } from 'vue'
import type { Price } from 'src/generated/graphql'
import { isEmpty } from 'lodash'

interface Props {
  modelValue: Price | {}
  index: number
}

const props = defineProps<Props>()

interface Emits {
  (e: 'update:modelValue', index: number, value: Price | {}): void
}

const emit = defineEmits<Emits>()

const amount = ref('')
const currency = ref('USD')

watchEffect(() => {
  const newValue: any = props.modelValue
  if (isEmpty(newValue)) {
    amount.value = ''
    currency.value = 'USD'
  } else {
    amount.value = (newValue.amount / 100).toString()
    currency.value = newValue?.currency
  }
})

const valid = computed(() => {
  return currency.value === 'USD' && !Number.isNaN(parseFloat(amount.value))
})

watch([amount, currency], ([newAmount, newCurrency]) => {
  if (valid.value) {
    emit('update:modelValue', props.index, {
      currency: newCurrency,
      amount: (parseFloat(newAmount) * 100).toFixed(0),
    })
  } else {
    emit('update:modelValue', props.index, {})
  }
})
</script>
