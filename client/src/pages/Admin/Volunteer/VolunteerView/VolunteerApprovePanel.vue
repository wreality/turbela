<template>
  <div>
    <query-table
      v-model:selected="selected"
      :columns="columns"
      :query="Query"
      :variables="variables"
      field="volunteer.hours"
      :searchable="false"
      selection="multiple"
      t-prefix="volunteers.users.hours.table"
    >
      <template #top-before>
        <q-btn
          color="primary"
          :disable="selected.length < 1"
          @click="approveSelectedClick"
        >
          Approve Selected
        </q-btn>
        <q-space />
      </template>
      <template #no-data>
        <empty-state icon="sym_o_work_history" t-prefix="emptyState" />
      </template>
    </query-table>
  </div>
</template>

<script setup lang="ts">
import QueryTable, {
  type Column,
} from 'src/components/_molecules/QueryTable.vue'
import { User } from 'src/gql/graphql'
import { graphql } from 'src/gql'
import { computed, ref } from 'vue'
import TimeRangeRow from 'src/components/_molecules/Tables/TimeRangeRow.vue'
import UserItemRow from 'src/components/_molecules/Tables/UserItemRow.vue'
import EmptyState from 'src/components/_molecules/EmptyState.vue'

const props = defineProps<{
  user: User
}>()

const variables = computed(() => {
  return {
    id: props.user.id,
  }
})

const Query = graphql(`
  query VolunteerUnapproved(
    $id: ID!
    $page: Int!
    $first: Int!
    $orderBy: [VolunteerHoursOrderByOrderByClause!]
    $range: VolunteerHoursRangeInput
  ) {
    volunteer(id: $id) {
      id
      hours(
        first: $first
        page: $page
        range: $range
        orderBy: $orderBy
        scope: { approved: false }
      ) {
        paginatorInfo {
          ...Paginator
        }
        data {
          id
          start
          end
          length
          approved
          supervisor {
            ...UserItem
          }
        }
      }
    }
  }
`)

const columns: Column[] = [
  {
    name: 'start',
    label: 'start',
    field: (row) => row,
    component: TimeRangeRow,
    align: 'left',
    sortable: true,
  },
  {
    name: 'supervisor',
    label: 'supervisor',
    field: (row) => row.supervisor,
    component: UserItemRow,
    align: 'left',
  },
  {
    name: 'length',
    label: 'length',
    field: (row) => row.length / 10,
    sortable: true,
  },
]

const selected = ref([])

function approveSelectedClick() {}
</script>

<style scoped></style>
