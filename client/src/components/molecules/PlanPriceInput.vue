<template lang="pug">
q-input(v-model='priceInput.amount', label='Price', outlined)
  template(#prepend)
    | $
  template(#after)
    q-select(
      v-model='price.currency',
      label='Currency',
      outlined,
      :options='["USD"]'
    )
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue'
import type { Price } from 'src/generated/graphql'

interface Props {
  modelValue: Array<Price>
}

const props = defineProps<Props>()

const emit = defineEmits(['update:modelValue'])

const price = reactive<Price>({
  amount: 0,
  currency: 'USD',
})

const priceInput = reactive<Price>({
  amount: 0,
  currency: 'USD',
})

watch(
  () => props.modelValue,
  (newValue) => {
    const priceObj = newValue?.[0] ?? null

    if (priceObj) {
      Object.assign(price, priceObj)
    }
  }
)

watch(
  () => ({ ...priceInput }),
  (newValue) => {
    emit('update:modelValue', [
      {
        currency: newValue.currency,
        amount:
          typeof newValue.amount === 'string'
            ? parseInt(newValue.amount)
            : newValue.amount,
      },
    ])
  }
)
</script>
