<template>
  <div>
    <VeeField name="range" stack-label @click="isShown = !isShown">
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
              <q-list>
                <q-item
                  v-for="(range, key) in ranges"
                  :key="key"
                  clickable
                  @click="localRange = range"
                >
                  <q-item-section>{{ t(`predefined.${key}`) }}</q-item-section>
                </q-item>
              </q-list>
              <q-separator vertical />
              <q-date v-model="pickerRange" minimal range flat landscape />
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

const isShown = ref(false)
const { t, provide } = usei18nPrefix()
provide('daterange_picker')

export type TimeRange = {
  from: DateTime
  to: DateTime
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
  const { from, to } = localRange.value
  const predefinedRange = Object.keys(ranges).find(
    (key) =>
      ranges[key as keyof typeof ranges].from.toFormat('yyyy/MM/dd') ===
        from.toFormat('yyyy/MM/dd') &&
      ranges[key as keyof typeof ranges].to.toFormat('yyyy/MM/dd') ===
        to.toFormat('yyyy/MM/dd')
  )
  if (from && to) {
    return `${from.toFormat('yyyy-MM-dd')} through ${to.toFormat(
      'yyyy-MM-dd'
    )} (${predefinedRange ? t(`predefined.${predefinedRange}`) : t('custom')})`
  }
  return ''
})

const ranges = {
  last_week: {
    from: DateTime.now().minus({ weeks: 1 }).startOf('week'),
    to: DateTime.now().minus({ weeks: 1 }).endOf('week'),
  },
  this_week: {
    from: DateTime.now().startOf('week'),
    to: DateTime.now().endOf('week'),
  },
  last_month: {
    from: DateTime.now().minus({ months: 1 }).startOf('month'),
    to: DateTime.now().minus({ months: 1 }).endOf('month'),
  },
  this_month: {
    from: DateTime.now().startOf('month'),
    to: DateTime.now().endOf('month'),
  },

  last_quarter: {
    from: DateTime.now().minus({ quarters: 1 }).startOf('quarter'),
    to: DateTime.now().minus({ quarters: 1 }).endOf('quarter'),
  },
  this_quarter: {
    from: DateTime.now().startOf('quarter'),
    to: DateTime.now().endOf('quarter'),
  },
  this_year: {
    from: DateTime.now().startOf('year'),
    to: DateTime.now().endOf('year'),
  },
  last_year: {
    from: DateTime.now().minus({ years: 1 }).startOf('year'),
    to: DateTime.now().minus({ years: 1 }).endOf('year'),
  },
}
</script>
