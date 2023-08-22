<template>
  <q-card flat>
    <q-card-section>{{ badge.name }} </q-card-section>
    <q-card-section>
      <query-table
        :columns="columns"
        field="badge.users"
        :variables="{ id: id }"
        :query="GetBadgeUsersDocument"
        t-prefix="badges.users.table"
      >
        <template #body-cell-Completed="p">
          <q-td :props="p">
            <q-item>
              <q-item-section>
                <q-item-label>
                  {{ DateTime.fromISO(p.value).toFormat('yyyy-MM-dd') }}
                </q-item-label>
                <q-item-label caption>
                  <RelativeTime :date-time="p.value" />
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-td>
        </template>
        <template #body-cell-Name="p">
          <q-td :props="p">
            <q-item>
              <q-item-section avatar>
                <UserAvatar :user="{ id: p.row.id }" />
              </q-item-section>
              <q-item-section>
                <q-item-label>
                  {{ p.value }}
                </q-item-label>
                <q-item-label caption>
                  {{ p.row.email }}
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-td>
        </template>
      </query-table>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { badgeFieldsFragment } from 'src/graphql/queries'
import { QTableProps } from 'quasar'
import UserAvatar from 'src/components/User/UserAvatar.vue'
import QueryTable from 'src/components/_molecules/QueryTable.vue'
import { useQuery } from '@vue/apollo-composable'
import { pick } from 'lodash'

import { useBreadcrumbTags } from 'src/composables/breadcrumbs'

import type { Badge } from 'src/generated/graphql'
import { GetBadgeUsersDocument } from 'src/generated/graphql'
import { computed } from 'vue'

interface Props {
  id: Badge['id']
}

const props = defineProps<Props>()

const columns: QTableProps['columns'] = [
  {
    name: 'Name',
    field: 'name',
    label: 'name',
    align: 'left',
  },
  {
    name: 'Completed',
    field: (row) => row.completion.created_at,
    label: 'completed',
    align: 'left',
  },
]

const badgeQuery = useQuery(GetBadgeUsersDocument, { id: props.id, page: 1 })
const badge = computed(
  () => pick(badgeQuery.result.value?.badge, ['name']) ?? {}
)

const { setTag } = useBreadcrumbTags()
setTag(
  '#badge_name',
  computed(() => badgeQuery.result.value?.badge?.name ?? '')
)

//Mutation
</script>

<script lang="ts">
import { gql } from 'graphql-tag'
import RelativeTime from 'src/components/_atoms/RelativeTime.vue'
import { DateTime } from 'luxon'
gql`
  query GetBadgeUsers(
    $id: ID!
    $page: Int!
    $search: String
    $first: Int = 25
  ) {
    badge(id: $id) {
      id
      ...badgeFields
      users(q: $search, page: $page, first: $first) {
        data {
          id
          name
          email
          completion {
            created_at
          }
        }
        paginatorInfo {
          currentPage
          total
        }
      }
    }
  }
  ${badgeFieldsFragment}
`
</script>
