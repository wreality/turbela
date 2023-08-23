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
                <q-item-section>
                  <q-item-label>
                    {{ p.value }}
                  </q-item-label>
                </q-item-section>
              </q-item>
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
                    (<RelativeTime :date-time="p.row.completion.created_at" />)
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
                  <q-item>
                    <q-item-section avatar>
                      <UserAvatar
                        :user="{ id: p.row.completion.instructor.id }"
                      />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>
                        {{ p.row.completion.instructor.name }}
                      </q-item-label>
                      <q-item-label caption>
                        {{ p.row.completion.instructor.email }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-card-section>
              </q-card>
            </div>
          </template>
        </query-table>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import UserAvatar from 'src/components/User/UserAvatar.vue'
import QueryTable from 'src/components/_molecules/QueryTable.vue'
import RelativeTime from 'src/components/_atoms/RelativeTime.vue'
import { User, UserBadgesDocument } from 'src/generated/graphql'
import UserBadgeAssignDialog from 'src/components/_dialogs/UserBadgeAssignDialog.vue'
interface Props {
  user: User
}

const props = defineProps<Props>()
const queryTableRef = ref<InstanceType<typeof QueryTable>>()

const { dialog } = useQuasar()
function assignUserBadge() {
  dialog({
    component: UserBadgeAssignDialog,
    componentProps: {
      user: props.user,
    },
  }).onOk(() => {
    queryTableRef.value?.refetch()
  })
}

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
</script>

<script lang="ts">
import { gql } from 'graphql-tag'
import { QTableProps, useQuasar } from 'quasar'
import { DateTime } from 'luxon'
import { ref } from 'vue'

gql`
  query UserBadges($id: ID!, $page: Int!, $search: String, $first: Int = 25) {
    user(id: $id) {
      id
      badges(q: $search, page: $page, first: $first) {
        data {
          id
          name
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
`
</script>
