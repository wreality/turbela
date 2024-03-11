<template>
  <q-card flat>
    <q-card-section>
      <query-table
        :columns="columns"
        :query="GetBadgesDocument"
        t-prefix="settings.badge.index.table"
        @row-click="select"
      />
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { QTableProps } from 'quasar'
import QueryTable from 'src/components/_molecules/QueryTable.vue'
import { GetBadgesDocument } from 'src/gql/graphql'
import { useRouter } from 'vue-router/auto'
import { Badge } from 'src/gql/graphql'

const columns: QTableProps['columns'] = [
  {
    name: 'Name',
    field: 'name',
    label: 'name',
    align: 'left',
  },
]

const { push } = useRouter()

function select(_: any, badge: Badge) {
  push({ name: '/badges/[id]', params: { id: badge.id } })
}
</script>

<script lang="ts">
import { graphql } from 'src/gql'
graphql(`
  query GetBadges($page: Int!, $search: String, $first: Int = 25) {
    badges(search: $search, page: $page, first: $first) {
      data {
        id
        name
      }
      paginatorInfo {
        currentPage
        total
      }
    }
  }
`)
</script>
