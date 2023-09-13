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

          <template #no-data> No users have been awarded this badge. </template>
        </query-table>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar'
import QueryTable, {
  type Column,
} from 'src/components/_molecules/QueryTable.vue'
import { useQuery } from '@vue/apollo-composable'
import { pick } from 'lodash'

import { useScope } from 'src/composables/breadcrumbs'

import type { Badge } from 'src/gql/graphql'
import { GetBadgeUsersDocument } from 'src/gql/graphql'
import { computed, ref } from 'vue'

interface Props {
  id: Badge['id']
}

const props = defineProps<Props>()

const queryTableRef = ref<InstanceType<typeof QueryTable>>()

const columns: Column[] = [
  {
    name: 'Name',
    field: (row) => row,
    label: 'name',
    align: 'left',
    component: 'UserItem',
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
    component: 'UserItem',
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
      badgeId: props.id,
      userId: row.id,
      header: 'user',
    },
  })
}

//Mutation
</script>

<script lang="ts">
import { graphql } from 'src/gql'
import RelativeTime from 'src/components/_atoms/RelativeTime.vue'
import { DateTime } from 'luxon'
import BadgeUserAssignDialog from 'src/components/_dialogs/BadgeUserAssignDialog.vue'
import BadgeCompletionDetailsDialog from 'src/components/_dialogs/BadgeCompletionDetailsDialog.vue'
graphql(`
  query GetBadgeUsers(
    $id: ID!
    $page: Int!
    $search: String
    $first: Int = 25
  ) {
    badge(id: $id) {
      id
      name
      users(q: $search, page: $page, first: $first) {
        data {
          id
          ...UserItem
          completion {
            created_at
            notes
            instructor {
              ...UserItem
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
`)
</script>
