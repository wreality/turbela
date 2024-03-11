<template>
  <q-card flat>
    <q-card-section>
      <query-table
        :new-to="{ name: 'settings:badges:new' }"
        :columns="columns"
        :query="GetBadgesAdminDocument"
        t-prefix="settings.badge.index.table"
        @row-click="select"
      />
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { QTableProps } from 'quasar'
import QueryTable from 'src/components/_molecules/QueryTable.vue'
import { GetBadgesAdminDocument } from 'src/gql/graphql'
import { useRouter } from 'vue-router/auto'

definePage({
  name: 'settings:badges',
  title: 'Badges Setup',
})

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
  push({
    name: 'settings:badges:view',
    params: { id: badge.id },
  })
}
</script>

<script lang="ts">
import { graphql } from 'src/gql'
import { Badge } from 'src/gql/graphql'
import { badgeFieldsFragment } from 'src/graphql/queries'
import { definePage } from 'vue-router/auto'
graphql(`
  query GetBadgesAdmin($page: Int!, $search: String, $first: Int = 25) {
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
  ${badgeFieldsFragment}
`)
</script>
