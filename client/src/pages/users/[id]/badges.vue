<template>
  <div>
    <q-card flat>
      <q-card-section>
        <query-table
          ref="queryTableRef"
          :columns="columns"
          field="user.badges"
          :variables="{ id: props.user.id }"
          :query="UserBadgesDocument"
          t-prefix="users.badges.table"
          @new="assignUserBadge"
          @row-click="showDetails"
        >
          <template #body-cell-Name="p">
            <q-td :props="p">
              <q-item>
                <q-item-section>
                  <q-item-label>
                    {{ p.value }}
                    <q-badge v-if="p.row.completion.revoked" color="red">
                      Revoked
                    </q-badge>
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-td>
          </template>
          <template #body-cell-Actions="p">
            <q-td :props="p">
              <q-btn-dropdown
                dropdown-icon="sym_o_more_vert"
                flat
                @before-show="onBeforeDropdownShow"
              >
                <q-list>
                  <q-item
                    v-close-popup
                    clickable
                    @click="onActionClick(p.value)"
                  >
                    <q-item-section>
                      <q-item-label v-if="p.value.completion.revoked">
                        Re-Grant
                      </q-item-label>
                      <q-item-label v-else>Revoke</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-btn-dropdown>
            </q-td>
          </template>
          <template #item="p">
            <div class="col-md-4 q-pa-xs">
              <q-card>
                <q-card-section class="">
                  <div class="text-h6">
                    {{ p.row.name }}
                  </div>
                  <div class="text-caption">
                    Awarded
                    {{
                      DateTime.fromISO(p.row.completion.created_at).toFormat(
                        'yyyy-MM-dd'
                      )
                    }}
                    (
                    <RelativeTime :date-time="p.row.completion.created_at" />
                    )
                  </div>
                </q-card-section>
                <q-separator />
                <q-card-section class="q-pa-xs">
                  <div
                    v-if="p.row.completion.notes?.length"
                    class="bg-grey-3 q-pa-sm q-mx-md"
                  >
                    {{ p.row.completion.notes }}
                  </div>
                  <UserItem :user="p.row.completion.instructor" />
                </q-card-section>
              </q-card>
            </div>
          </template>
          <template #no-data>
            This user hasn't been awarded any badges yet.
          </template>
        </query-table>
      </q-card-section>
    </q-card>
    <router-view :badges="queryTableRef?.rows" />
  </div>
</template>

<script setup lang="ts">
import QueryTable, {
  type Column,
} from 'src/components/_molecules/QueryTable.vue'
import type { User } from 'src/gql/graphql'
import { DateTime } from 'luxon'

definePage({
  name: 'users:view:badges',
  meta: {
    appIcon: 'badge',
    crumb: { label: 'Badges' },
    navigation: {
      label: 'Badges',
    },
  },
})

interface Props {
  user: User
}

const props = defineProps<Props>()
const queryTableRef = ref<InstanceType<typeof QueryTable>>()

function assignUserBadge() {
  push({
    name: 'users:view:badges:assign',
  })
}

const columns: Column[] = [
  {
    name: 'Name',
    field: 'name',
    label: 'name',
    align: 'left',
  },
  {
    name: 'completed',
    field: (row) => row.completion.created_at,
    label: 'completed',
    align: 'left',
    component: 'Time',
  },
  {
    name: 'Instructor',
    field: (row) => row.completion.instructor,
    label: 'instructor',
    align: 'left',
    component: 'UserItem',
  },
  {
    name: 'Actions',
    field: (row) => row,
    label: 'actions',
    align: 'right',
  },
]
const { push } = useRouter()

function showDetails(e: any, row: any) {
  push({
    name: 'users:view:badges:view',
    params: { id: props.user.id, badgeId: row.id },
  })
}

function onActionClick(row: any) {
  push({
    name: 'users:view:badges:revoke',
    params: { id: props.user.id, badgeId: row.id },
  })
}

function onBeforeDropdownShow(e: Event) {
  e.stopPropagation()
}

onBeforeRouteUpdate(async (to, from) => {
  if (to.name === 'users:view:badges') {
    await queryTableRef.value?.refetch()
  }
})
</script>

<script lang="ts">
graphql(`
  query UserBadges($id: ID!, $page: Int!, $search: String, $first: Int = 25) {
    user(id: $id) {
      id
      badges(q: $search, page: $page, first: $first) {
        data {
          id
          name
          completion {
            ...BadgeCompletionDetails
            id
            revoked
            created_at
            notes
            instructor_id
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
