<template>
  <q-card>
    <q-tabs align="left">
      <q-route-tab to="/volunteers/active">Active</q-route-tab>
      <q-route-tab to="/volunteers/punchedIn">
        Punched In
        <q-badge v-if="punchedInCount" floating color="primary">
          {{ punchedInCount }}
        </q-badge>
      </q-route-tab>
      <q-route-tab to="/volunteers/inactive">Inactive</q-route-tab>
    </q-tabs>
  </q-card>
  <q-card>
    <q-card-section>
      <query-table
        ref="queryTableRef"
        :query="VolunteersDocument"
        :columns="columns"
        :variables="variables"
        t-prefix="volunteers.index.table"
        @new="newVolunteer"
        @row-click="onRowClick"
      >
        <template #body-cell-actions="p">
          <q-td :props="p">
            <q-btn-dropdown dropdown-icon="sym_o_more_vert" flat>
              <q-list>
                <q-item v-close-popup clickable @click="onToggleClick(p.row)">
                  <q-item-section>
                    <q-item-label>
                      {{
                        p.value.volunteer.active ? 'De-activate' : 'Re-activate'
                      }}
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-btn-dropdown>
          </q-td>
        </template>
      </query-table>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import VolunteerUpdateDialog from 'src/components/_dialogs/VolunteerUpdateDialog.vue'
import {
  VolunteersDocument,
  ToggleVolunteerDocument,
  VolunteerScopesInput,
  PunchedInVolunteerCountDocument,
} from 'src/gql/graphql'
import QueryTable from 'src/components/_molecules/QueryTable.vue'
import { Column } from 'src/components/_molecules/QueryTable.vue'

type Scope = 'active' | 'inactive' | 'punchedIn'

const queryTableRef = ref<InstanceType<typeof QueryTable>>()
const filter = ref<Scope>('active')

const route = useRoute('/volunteers/[[scope]]')
const { push } = useRouter()

if (!route.params.scope) {
  push('/volunteers/active')
}

const scope = computed(() => {
  const scopes: Record<Scope, VolunteerScopesInput> = {
    active: { active: true },
    inactive: { active: false },
    punchedIn: { punchedIn: true },
  }

  return (
    scopes[(route.params.scope || 'active') as keyof typeof scopes] ??
    scopes['active']
  )
})

const variables = computed(() => ({
  scope: scope.value,
}))

const columns = computed<Column[]>(() => {
  const nameColumn: Column = {
    name: 'name',
    field: (row) => row,
    label: 'name',
    align: 'left',
    component: 'UserItem',
  }
  const sinceColumn: Column = {
    name: 'since',
    field: (row) => row.volunteer.created_at,
    label: 'volunteer_since',
    align: 'left',
    component: 'Time',
  }
  const punchedInColumn: Column = {
    name: 'punchedIn',
    field: (row) => row.volunteer.current_hour?.start,
    label: 'punched_in',
    align: 'left',
    component: 'Time',
  }

  switch (filter.value) {
    case 'active':
    case 'inactive':
      return [nameColumn, sinceColumn]
    case 'punchedIn':
      return [nameColumn, punchedInColumn]
  }
  return []
})

const { mutate } = useMutation(ToggleVolunteerDocument)

async function onToggleClick(row: any) {
  await mutate({
    id: row.id,
    active: !row.volunteer.active,
  })
}

const { dialog } = useQuasar()
function newVolunteer() {
  dialog({
    component: VolunteerUpdateDialog,
  }).onOk(() => {
    queryTableRef.value?.refetch()
  })
}

function onRowClick(_: any, row: any) {
  push({ name: '/volunteers/view/[id]', params: { id: row.id } })
}

const { result: countResult } = useQuery(PunchedInVolunteerCountDocument)

const punchedInCount = computed(() => {
  return countResult.value?.punchedInVolunteers
})

definePage({})
</script>

<script lang="ts">
import { graphql } from 'src/gql'
import { useMutation, useQuery } from '@vue/apollo-composable'
import { useQuasar } from 'quasar'
import { definePage, useRouter } from 'vue-router/auto'
import { useRoute } from 'vue-router/auto'

graphql(`
  query Volunteers(
    $search: String
    $scope: VolunteerScopesInput
    $page: Int
    $first: Int = 25
  ) {
    users(
      page: $page
      first: $first
      search: $search
      scope: { volunteer: $scope }
    ) {
      paginatorInfo {
        currentPage
        total
      }
      data {
        ...UserItem
        id
        roles
        volunteer {
          id
          active
          created_at
          hour_tenths_available
          hour_tenths_redeemed
        }
      }
    }
  }
`)

graphql(`
  query PunchedInVolunteerCount {
    punchedInVolunteers
  }
`)

graphql(`
  mutation ToggleVolunteer($id: ID!, $active: Boolean!) {
    volunteer {
      updateVolunteer(input: { id: $id, active: $active }) {
        id
        active
      }
    }
  }
`)
</script>

<style scoped></style>
