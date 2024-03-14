<template>
  <div>
    <div class="bg-indigo-5 text-white row">
      <div class="col-md-10 q-ma-md">
        <div class="text-h4 text-weight-medium">
          {{ badge.name }}
        </div>
      </div>
    </div>

    <q-card flat>
      <q-card-section>
        <query-table
          ref="queryTableRef"
          :columns="columns"
          field="badge.users"
          :variables="{ id: badgeId }"
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

          <template #no-data>No users have been awarded this badge.</template>
        </query-table>
      </q-card-section>
    </q-card>
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { DateTime } from 'luxon'
import QueryTable, {
  type Column,
} from 'src/components/_molecules/QueryTable.vue'
import { pick } from 'lodash'

definePage({
  name: 'badges:view',
  meta: {
    crumb: { label: 'Edit' },
  },
})
const route = useRoute('badges:view')
const badgeId = computed(() => route.params.id)

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

const badgeQuery = useQuery(GetBadgeUsersDocument, {
  id: badgeId.value,
  page: 1,
})
const badge = computed(
  () => pick(badgeQuery.result.value?.badge, ['name']) ?? {}
)

setCrumbLabel(
  'badges:view',
  computed(() => badgeQuery.result.value?.badge?.name ?? '')
)

function assignBadgeUsers() {
  push({
    name: 'badges:view:assign',
    params: { id: badgeId.value },
  })
}

const { push } = useRouter()
function showDetails(_: any, row: any) {
  push({
    name: 'badges:view:user',
    params: { id: badgeId.value, userId: row.id },
    replace: true,
  })
}

onBeforeRouteUpdate(async (to, from) => {
  if (to.name === 'badges:view') {
    await queryTableRef.value?.refetch()
  }
})
</script>

<script lang="ts">
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
            ...BadgeCompletionDetails
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
