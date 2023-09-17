<template>
  <div>
    <VeeField
      name="range"
      stack-label
      @click="isShown = !isShown"
      @focus="isShown = true"
    >
      <template #prepend>
        <q-icon name="event" />
        <q-popup-proxy
          v-model="isShown"
          cover
          transition-show="scale"
          transition-hide="scale"
        >
          <q-card>
            <q-card-section horizontal>
              <q-card-section class="q-pa-none">
                <div class="column">
                  <div>
                    <div class="row">
                      <DatePickerRangeLabels
                        class="col-6"
                        :grouped-range="groupedRanges['last']"
                        :current-range="currentRange"
                        @click="rangeClick"
                      />
                      <DatePickerRangeLabels
                        class="col-6"
                        :grouped-range="groupedRanges['this']"
                        :current-range="currentRange"
                        @click="rangeClick"
                      />
                    </div>
                  </div>
                  <q-separator />
                  <DatePickerRangeLabels
                    :grouped-range="groupedRanges['prev']"
                    class="row"
                    item-class="col-6"
                    :current-range="currentRange"
                    @click="rangeClick"
                  />
                </div>
              </q-card-section>
              <q-separator vertical />
              <q-card-section class="q-pa-none">
                <q-date v-model="pickerRange" minimal range flat landscape />
              </q-card-section>
            </q-card-section>
          </q-card>
        </q-popup-proxy>
      </template>
      <template #control>{{ rangeText }} </template>
    </VeeField>
  </div>
</template>

<script setup lang="ts">
import VeeField from 'src/components/_atoms/VeeField.vue'
import { DateTime } from 'luxon'
import { computed, ref } from 'vue'
import { usei18nPrefix } from 'src/composables/i18nPrefix'
import { groupBy } from 'lodash'
import DatePickerRangeLabels from './DatePickerRangeLabels.vue'

const isShown = ref(true)
const { t, provide } = usei18nPrefix()
provide('daterange_picker')

export type TimeRange = {
  from: DateTime
  to: DateTime
  label?: string
}

const props = defineProps<{
  modelValue: TimeRange
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: object): void
}>()

const localRange = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

function rangeClick(value: TimeRange) {
  localRange.value = value
  isShown.value = false
}
const pickerRange = computed({
  get: () => ({
    from: props.modelValue.from.toFormat('yyyy/MM/dd'),
    to: props.modelValue.to.toFormat('yyyy/MM/dd'),
  }),
  set: ({ from, to }) => {
    localRange.value = {
      from: DateTime.fromFormat(from, 'yyyy/MM/dd'),
      to: DateTime.fromFormat(to, 'yyyy/MM/dd'),
    }
  },
})

const rangeText = computed(() => {
  const { from, to, label } = localRange.value

  if (from && to) {
    return `${from.toFormat('yyyy-MM-dd')} through ${to.toFormat(
      'yyyy-MM-dd'
    )} (${label ? t(`predefined.${label}`) : t('custom')})`
  }
  return ''
})

const currentRange = computed(() => {
  const { label } = localRange.value
  return label ?? 'custom'
})

const ranges = [
  {
    label: 'last_week',
    from: DateTime.now().minus({ weeks: 1 }).startOf('week'),
    to: DateTime.now().minus({ weeks: 1 }).endOf('week'),
  },
  {
    label: 'this_week',
    from: DateTime.now().startOf('week'),
    to: DateTime.now().endOf('week'),
  },
  {
    label: 'last_month',
    from: DateTime.now().minus({ months: 1 }).startOf('month'),
    to: DateTime.now().minus({ months: 1 }).endOf('month'),
  },
  {
    label: 'this_month',
    from: DateTime.now().startOf('month'),
    to: DateTime.now().endOf('month'),
  },

  {
    label: 'last_quarter',
    from: DateTime.now().minus({ quarters: 1 }).startOf('quarter'),
    to: DateTime.now().minus({ quarters: 1 }).endOf('quarter'),
  },

  {
    label: 'this_quarter',
    from: DateTime.now().startOf('quarter'),
    to: DateTime.now().endOf('quarter'),
  },
  {
    label: 'last_year',
    from: DateTime.now().startOf('year'),
    to: DateTime.now().endOf('year'),
  },
  {
    label: 'this_year',
    from: DateTime.now().minus({ years: 1 }).startOf('year'),
    to: DateTime.now().minus({ years: 1 }).endOf('year'),
  },
  {
    label: 'prev_7days',
    from: DateTime.now().minus({ days: 7 }),
    to: DateTime.now(),
  },
  {
    label: 'prev_30days',
    from: DateTime.now().minus({ days: 30 }),
    to: DateTime.now(),
  },
  {
    label: 'prev_90days',
    from: DateTime.now().minus({ days: 90 }),
    to: DateTime.now(),
  },
]

const groupedRanges = groupBy(ranges, (range) => range.label.split('_')[0])
console.log(groupedRanges)
</script>
