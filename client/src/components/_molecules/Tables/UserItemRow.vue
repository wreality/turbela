<template>
  <q-td :props="$props.scope">
    <UserItem :user="$props.scope.value" />
  </q-td>
</template>

<script lang="ts" setup>
import type { QTableSlots } from 'quasar'
import UserItem from 'src/components/User/UserItem.vue'

interface Props {
  scope: Parameters<QTableSlots['body-cell-cell']>[0]
}

defineProps<Props>()
</script>
