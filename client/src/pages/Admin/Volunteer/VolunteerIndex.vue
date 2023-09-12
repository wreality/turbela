<template>
  <q-card>
    <q-card-section>
      <q-btn-toggle
        v-model="filter"
        flat
        :options="[
          { label: $t('volunteers.index.active'), value: 'active' },
          { label: $t('volunteers.index.punched_in'), value: 'punched_in' },
          { label: $t('volunteers.index.inactive'), value: 'inactive' },
        ]"
      />
    </q-card-section>
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
import { VolunteersDocument, ToggleVolunteerDocument } from 'src/gql/graphql'
import QueryTable from 'src/components/_molecules/QueryTable.vue'
import { Column } from 'src/components/_molecules/QueryTable.vue'

const queryTableRef = ref<InstanceType<typeof QueryTable>>()
const filter = ref('active')
const variables = computed(
  () =>
    ({
      active: {
        active: true,
      },
      inactive: {
        active: false,
      },
      punched_in: {
        punchedIn: true,
      },
    })[filter.value]
)
const columns = computed<Column[]>(() => {
  const nameColumn: Column = {
    name: 'name',
    field: (row) => row.id,
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
    case 'punched_in':
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
const { push } = useRouter()

function onRowClick(_: any, row: any) {
  push({
    name: 'admin:volunteer:view',
    params: { id: row.id },
  })
}
</script>

<script lang="ts">
import { graphql } from 'src/gql'
import { useMutation } from '@vue/apollo-composable'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'

graphql(`
  query Volunteers(
    $search: String
    $active: Boolean
    $punchedIn: Boolean
    $page: Int
    $first: Int = 25
  ) {
    volunteers(
      page: $page
      first: $first
      search: $search
      active: $active
      punchedIn: $punchedIn
    ) {
      paginatorInfo {
        currentPage
        total
      }
      data {
        id
        name
        email
        roles
        volunteer {
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
