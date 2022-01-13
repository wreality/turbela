<template lang="pug">
div(v-if='!simple')
  q-input.q-pr-none(v-model='advancedValue', outlined, label='Duration')

div(v-else)
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
import { computed, ref, watch, reactive, nextTick } from 'vue'
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

const simpleAmount = ref<number | string>('')
const simpleTerm = ref<SectionOption>('years')
const sections = reactive<DurationLikeObject>({})
const advancedValue = ref<string>('')

const sectionArray = computed((): SectionOption[] => {
  return <SectionOption[]>Object.keys(sections)
})

function createDurationString(value: DurationLikeObject) {
  emit('update:modelValue', Duration.fromObject(value).toString())
}

watch([simpleAmount, simpleTerm], () => {
  const result: DurationLikeObject = {}
  const amount =
    typeof simpleAmount.value === 'string'
      ? parseInt(simpleAmount.value)
      : simpleAmount.value
  if (isNaN(amount)) {
    emit('update:modelValue', '')
  } else {
    createDurationString(result)
  }
})

watch([advancedValue], (newValue) => {
  emit('update:modelValue', 'newValue')
})

watch(
  () => props.modelValue,
  async (newValue) => {
    Object.assign(sections, Duration.fromISO(newValue).toObject())
    await nextTick()
    if (sectionArray.value.length === 1) {
      simpleTerm.value = sectionArray.value[0]
      simpleAmount.value = <number>sections[sectionArray.value[0]]
    } else {
      advancedValue.value = newValue
    }
  }
)

const simple = computed(() => {
  return sectionArray.value.length < 2
})
</script>

<style scoped lang="scss">
.q-field--outlined .q-field__control {
  padding: 0 0 0 12px !important;
}
</style>
