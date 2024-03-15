<template>
  <q-list>
    <q-item
      v-for="range in groupedRange"
      :key="range.label"
      :class="itemClass"
      :active="currentRange === range.label"
      active-class="bg-blue-1"
      class="text-center q-pa-xs"
      clickable
      @click="$emit('click', range)"
    >
      <q-item-section>{{ t(`predefined.${range.label}`) }}</q-item-section>
    </q-item>
  </q-list>
</template>

<script setup lang="ts">
import type { TimeRange } from './DateRangePicker.vue'

withDefaults(
  defineProps<{
    groupedRange: TimeRange[]
    currentRange: string
    itemClass?: string
  }>(),
  {
    itemClass: '',
  }
)

defineEmits<{
  (e: 'click', value: TimeRange): void
}>()

const { t } = usei18nPrefix()
</script>
