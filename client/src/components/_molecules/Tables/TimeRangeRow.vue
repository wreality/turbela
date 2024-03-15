<template>
  <q-td :props="$props.scope">
    <q-item>
      <q-item-section>
        <q-item-label>
          {{ start.toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY) }}
        </q-item-label>
        <q-item-label>
          {{ start.toLocaleString(DateTime.TIME_SIMPLE) }}
          -
          {{ end.toLocaleString(DateTime.TIME_SIMPLE) }}
        </q-item-label>
      </q-item-section>
    </q-item>
  </q-td>
</template>

<script lang="ts" setup>
import { DateTime } from 'luxon'
import type { QTableSlots } from 'quasar'

interface Props {
  scope: Parameters<QTableSlots['body-cell-cell']>[0]
}

const props = defineProps<Props>()

const start = computed(() => DateTime.fromISO(props.scope.row.start))
const end = computed(() => DateTime.fromISO(props.scope.row.end))
</script>
