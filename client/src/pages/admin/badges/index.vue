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
import type { QTableProps } from 'quasar'
import type { Badge } from 'src/gql/graphql'

definePage({
  name: 'settings:badges',
  meta: {
    appIcon: 'badge',
    pageTitle: 'Badges Setup',
  },
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

defineExpose({ GetBadgesAdminDocument })
</script>

<script lang="ts">
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
