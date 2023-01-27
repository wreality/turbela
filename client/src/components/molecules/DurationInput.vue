<template lang="pug">
q-input(
  v-model='simpleAmount',
  outlined,
  label='Duration',
  :error='props.error'
)
  template(#after)
    q-select(:options='sectionOptions', label='Unit', v-model='simpleTerm')
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { Duration } from 'luxon'
import type { DurationLikeObject } from 'luxon'
import type { ErrorObject } from '@vuelidate/core'

interface Props {
  modelValue: string
  error?: boolean
  errors?: Array<ErrorObject>
}

interface Emits {
  (e: 'update:modelValue', newValue: string): void
}

const props = withDefaults(defineProps<Props>(), {
  error: false,
  errors: () => [],
})

const emit = defineEmits<Emits>()

type SectionOption =
  | 'years'
  | 'months'
  | 'weeks'
  | 'days'
  | 'hours'
  | 'minutes'
  | 'seconds'
const sectionOptions: SectionOption[] = [
  'years',
  'months',
  'weeks',
  'days',
  'hours',
  'minutes',
  'seconds',
]

const simpleAmount = ref<string>('')
const simpleTerm = ref<SectionOption>('years')

function createDurationString(value: DurationLikeObject) {
  emit('update:modelValue', Duration.fromObject(value).toString())
}

watch([simpleAmount, simpleTerm], ([newAmount, newTerm]) => {
  const result: DurationLikeObject = {}
  const amount = parseInt(newAmount)
  if (!isNaN(amount)) {
    result[newTerm] = amount
    createDurationString(result)
  } else {
    emit('update:modelValue', '')
  }
})

watch(
  () => props.modelValue,
  async (newValue) => {
    const duration = Duration.fromISO(newValue).toObject()
    const [term, amount] = Object.entries(duration)[0] as [
      SectionOption,
      number
    ]
    simpleTerm.value = term
    simpleAmount.value = amount.toString()
  }
)
</script>

<style scoped lang="scss">
.q-field--outlined .q-field__control {
  padding: 0 0 0 12px !important;
}
</style>
