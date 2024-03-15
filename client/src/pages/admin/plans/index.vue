<template>
  <q-card flat>
    <q-card-section>
      <query-table
        :query="PlansDocument"
        :columns="columns"
        :new-to="{ name: '/admin/plans/new' }"
        t-prefix="settings.plan.index.table"
        @row-click="onTableRowClick"
      ></query-table>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import type { QTableProps } from 'quasar'
import type { Plan } from 'src/gql/graphql'

const columns: QTableProps['columns'] = [
  {
    name: 'name',
    field: 'name',
    align: 'left',
    label: 'name',
  },
]

const { push } = useRouter()
function onTableRowClick(_: any, row: Plan) {
  push({ name: '/admin/plans/[id]', params: { id: row.id } })
}
</script>

<script lang="ts">
graphql(`
  query Plans($page: Int!) {
    plans(page: $page) {
      paginatorInfo {
        count
        total
        lastPage
      }
      data {
        id
        name
      }
    }
  }
`)
</script>
