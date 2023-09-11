<template>
  <div>
    <div class="bg-indigo-5 text-white row">
      <div class="col-md-10 q-ma-md">
        <div class="text-h4 text-weight-medium">
          {{ badge.name }}
        </div>
      </div>
    </div>
    <div class="bg-indigo-8 text-white row">
      <q-tabs dense indicator-color="deep-purple-11" switch-indicator>
        <q-route-tab
          icon="person"
          label="Users"
          exact
          :to="{
            name: 'admin:badge:view',
            id: props.id,
          }"
        />
      </q-tabs>
    </div>
    <q-card flat>
      <q-card-section>
        <query-table
          ref="queryTableRef"
          :columns="columns"
          field="badge.users"
          :variables="{ id: id }"
          :query="GetBadgeUsersDocument"
          t-prefix="badges.users.table"
          @new="assignBadgeUsers"
          @row-click="showDetails"
        >
          <template #body-cell-Instructor="p">
            <q-td :props="p">
              <q-item>
                <q-item-section avatar>
                  <UserAvatar :user="{ id: p.value.id }" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>
                    {{ p.value.name }}
                  </q-item-label>
                  <q-item-label caption>
                    {{ p.value.email }}
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-td>
          </template>
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
          <template #no-data> No users have been awarded this badge. </template>
        </query-table>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import { badgeFieldsFragment } from 'src/graphql/queries'
import { QTableProps, useQuasar } from 'quasar'
import UserAvatar from 'src/components/User/UserAvatar.vue'
import QueryTable from 'src/components/_molecules/QueryTable.vue'
import { useQuery } from '@vue/apollo-composable'
import { pick } from 'lodash'

import { useScope } from 'src/composables/breadcrumbs'

import type { Badge } from 'src/generated/graphql'
import { GetBadgeUsersDocument } from 'src/generated/graphql'
import { computed, ref } from 'vue'

interface Props {
  id: Badge['id']
}

const props = defineProps<Props>()

const queryTableRef = ref<InstanceType<typeof QueryTable>>()

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
  {
    name: 'Instructor',
    field: (row) => row.completion.instructor,
    label: 'instructor',
    align: 'left',
  },
]

const badgeQuery = useQuery(GetBadgeUsersDocument, { id: props.id, page: 1 })
const badge = computed(
  () => pick(badgeQuery.result.value?.badge, ['name']) ?? {}
)

const { set } = useScope()
set({
  badgeName: computed(() => badgeQuery.result.value?.badge?.name ?? ''),
})

const { dialog } = useQuasar()
function assignBadgeUsers() {
  dialog({
    component: BadgeUserAssignDialog,
    componentProps: {
      badgeId: props.id,
    },
  }).onOk(() => {
    queryTableRef.value?.refetch()
  })
}

function showDetails(_: any, row: any) {
  dialog({
    component: BadgeCompletionDetailsDialog,
    componentProps: {
      completion: {
        badge_id: props.id,
        user_id: row.id,
      },
      header: 'user',
    },
  })
}

//Mutation
</script>

<script lang="ts">
import { gql } from 'graphql-tag'
import RelativeTime from 'src/components/_atoms/RelativeTime.vue'
import { DateTime } from 'luxon'
import BadgeUserAssignDialog from 'src/components/_dialogs/BadgeUserAssignDialog.vue'
import BadgeCompletionDetailsDialog from 'src/components/_dialogs/BadgeCompletionDetailsDialog.vue'
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
            notes
            instructor {
              id
              name
              email
            }
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
