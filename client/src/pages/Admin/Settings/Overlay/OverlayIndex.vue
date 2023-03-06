<template>
  <q-card flat>
    <q-card-section>
      <query-table
        :new-to="{ name: 'admin:overlays:create' }"
        :query="OverlaysDocument"
        :columns="columns"
        t-prefix="settings.overlay.index.table"
        @row-click="onTableRowClick"
      >
      </query-table>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import type { QTableProps } from 'quasar'
import { Overlay, OverlaysDocument } from 'src/generated/graphql'

const columns: QTableProps['columns'] = [
  {
    name: 'name',
    field: 'name',
    label: 'name',
    align: 'left',
  },
  {
    name: 'type',
    label: 'type',
    field: 'type',
    align: 'left',
  },
]
const { push } = useRouter()
function onTableRowClick(_: any, row: Overlay) {
  push({ name: 'admin:overlays:edit', params: { id: row.id } })
}
</script>

<script lang="ts">
import { gql } from 'graphql-tag'
import QueryTable from 'src/components/_molecules/QueryTable.vue'
import { useRouter } from 'vue-router'

gql`
  query Overlays($page: Int, $search: String, $first: Int = 25) {
    overlays(page: $page, first: $first, search: $search) {
      paginatorInfo {
        currentPage
        total
      }
      data {
        id
        name
        type
      }
    }
  }
`
</script>
