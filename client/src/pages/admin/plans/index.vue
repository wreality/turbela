<template>
  <q-card flat>
    <q-card-section>
      <query-table
        :query="PlansDocument"
        :columns="columns"
        :new-to="{ name: 'admin:overlays:create' }"
        t-prefix="settings.plan.index.table"
        @row-click="onTableRowClick"
      >
      </query-table>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { QTableProps } from 'quasar'
import QueryTable from 'src/components/_molecules/QueryTable.vue'
import { type Plan, PlansDocument } from 'src/gql/graphql'
import { useRouter } from 'vue-router'

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
  push({ name: 'admin:memberships:view', params: { id: row.id } })
}
</script>

<script lang="ts">
import { graphql } from 'src/gql'

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
