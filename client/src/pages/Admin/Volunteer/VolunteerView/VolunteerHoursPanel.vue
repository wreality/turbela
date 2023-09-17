<template>
  <q-card flat>
    <q-card-section>
      <DateRangePicker v-model="range" />
    </q-card-section>
    <q-card-section>
      <query-table
        :query="Query"
        :columns="columns"
        :variables="variables"
        field="volunteer.hours"
        :searchable="false"
        t-prefix="volunteers.users.hours.table"
        @row-click="onRowClick"
      />
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { DateTime } from 'luxon'
import DateRangePicker from './DateRangePicker.vue'
import QueryTable, {
  type Column,
} from 'src/components/_molecules/QueryTable.vue'

import { graphql } from 'src/gql'
import { User, VolunteerHour } from 'src/gql/graphql'
import { computed, defineAsyncComponent, ref } from 'vue'
import { useQuasar } from 'quasar'

const range = ref({
  from: DateTime.now().minus({ days: 7 }),
  to: DateTime.now(),
})

const Query = graphql(`
  query VolunteerHours(
    $id: ID!
    $page: Int!
    $first: Int!
    $orderBy: [VolunteerHoursOrderByOrderByClause!]
    $input: VolunteerHoursInput
  ) {
    volunteer(id: $id) {
      id
      hours(first: $first, page: $page, input: $input, orderBy: $orderBy) {
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
          ...VolunteerHourDetails
        }
      }
    }
  }
`)

const props = defineProps<{
  user: User
}>()

const variables = computed(() => ({
  id: props.user.id,
  input: {
    start: range.value.from
      .startOf('day')
      .toISO({ suppressMilliseconds: true }),
    end: range.value.to
      .endOf('day')
      .startOf('second')
      .toISO({ suppressMilliseconds: true }),
  },
}))

const columns: Column[] = [
  {
    name: 'start',
    label: 'start',
    field: (row) => row,
    component: 'TimeRange',
    align: 'left',
    sortable: true,
  },
  {
    name: 'supervisor',
    label: 'supervisor',
    field: (row) => row.supervisor,
    component: 'UserItem',
    align: 'left',
  },
  {
    name: 'length',
    label: 'length',
    field: (row) => row.length / 10,
    sortable: true,
  },
]

const { dialog } = useQuasar()
function onRowClick(_: any, row: VolunteerHour) {
  dialog({
    component: defineAsyncComponent(
      () => import('src/components/_dialogs/VolunteerHourDetailsDialog.vue')
    ),
    componentProps: {
      hour: row,
    },
  })
}
</script>

<style scoped></style>
