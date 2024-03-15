<template>
  <q-td :props="$props.scope">
    <q-item>
      <q-item-section>
        <q-item-label>
          {{ DateTime.fromISO($props.scope.value).toFormat('yyyy-MM-dd') }}
        </q-item-label>
        <q-item-label caption>
          <RelativeTime :date-time="$props.scope.value" />
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

defineProps<Props>()
</script>
