<template>
  <q-card flat>
    <q-card-section>
      <query-table
        :query="CoursesDocument"
        :columns="columns"
        t-prefix="settings.courses.index.table"
        @row-click="onTableRowClick"
      />
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import type { QTableProps } from 'quasar'
import type { Course } from 'src/gql/graphql'

const columns: QTableProps['columns'] = [
  {
    name: 'name',
    field: 'name',
    label: 'name',
    align: 'left',
  },
]

const { push } = useRouter()
function onTableRowClick(_: any, row: Course) {
  push({ name: 'admin:course:view', params: { id: row.id } })
}
</script>

<script lang="ts">
graphql(`
  query Courses($page: Int, $search: String, $first: Int = 25) {
    courses(page: $page, first: $first, search: $search) {
      paginatorInfo {
        currentPage
        total
      }
      data {
        id
        name
      }
    }
  }
`)
</script>

<style scoped></style>
