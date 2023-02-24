<template>
  <q-card flat>
    <q-card-section>
      <q-table
        v-model:pagination="pagination"
        flat
        :rows="overlays"
        :columns="columns"
        :loading="loading"
        :rows-per-page-options="[5, 25, 50, 100]"
        @request="onRequest"
        @row-click="onTableRowClick"
      >
        <template #top-right>
          <div class="row q-gutter-md">
            <q-input
              v-model="filter"
              borderless
              dense
              debounce="300"
              placeholder="Search"
              clearable
            >
              <template #append>
                <q-icon name="search" />
              </template>
            </q-input>
            <q-btn-group>
              <q-btn icon="refresh" @click="refetch()" />
              <q-btn color="primary" :to="{ name: 'admin:overlays:create' }">
                Create Overlay
              </q-btn>
            </q-btn-group>
          </div>
        </template>
      </q-table>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import { Overlay, OverlaysDocument } from 'src/generated/graphql'
import type { QTableProps } from 'quasar'
const pagination = ref({
  sortBy: 'desc',
  descending: false,
  page: 1,
  rowsPerPage: 25,
  rowsNumber: 0,
})
const filter = ref('')
const variables = computed(() => {
  return {
    first: pagination.value.rowsPerPage,
    page: pagination.value.page,
    search: filter.value,
  }
})
const { result, refetch, loading } = useQuery(OverlaysDocument, variables)

watch(result, (newValue) => {
  if (newValue) {
    pagination.value.rowsNumber = newValue.overlays?.paginatorInfo.total ?? 0
  }
})

function onRequest(props: QTableProps) {
  if (!props.pagination) {
    return
  }
  const { page, rowsPerPage } = props.pagination

  pagination.value.page = page ?? 1
  pagination.value.rowsPerPage = rowsPerPage ?? 25
}

const overlays = computed(() => result.value?.overlays?.data ?? [])

const columns: QTableProps['columns'] = [
  {
    name: 'name',
    field: 'name',
    label: 'Name',
    align: 'left',
  },
  {
    name: 'type',
    label: 'Type',
    field: 'type',
  },
  {
    name: 'actions',
    field: '',
    label: '',
  },
]
const { push } = useRouter()
function onTableRowClick(_: any, row: Overlay) {
  push({ name: 'admin:overlays:edit', params: { id: row.id } })
}
</script>

<script lang="ts">
import { gql } from 'graphql-tag'
import { useRouter } from 'vue-router'

gql`
  query Overlays($page: Int, $search: String, $first: Int = 25) {
    overlays(page: $page, first: $first, search: $search) {
      paginatorInfo {
        currentPage
        total
      }
      data {
        id
        name
        type
      }
    }
  }
`
</script>
