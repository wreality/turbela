<template>
  <q-card flat>
    <q-card-section>
      <q-table
        v-model:pagination="pagination"
        flat
        :rows="rows"
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
              <q-btn color="primary" @click="$emit('newClick')"
                >{{ newLabel ?? $t('table.new') }}
              </q-btn>
            </q-btn-group>
          </div>
        </template>
        <template #loading>
          <q-inner-loading showing color="primary" />
        </template>
        <!-- //@ts-ignore -->
        <template v-for="(_, name) in $slots" #[name]="slotData"
          ><slot :name="name" v-bind="slotData"
        /></template>
      </q-table>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { useQuery } from '@vue/apollo-composable'
import { DocumentNode } from 'graphql'
import type { QTableProps } from 'quasar'
import { computed, ref, watch } from 'vue'

interface Props {
  columns: QTableProps['columns']
  query: DocumentNode
  newLabel?: string
}
const props = defineProps<Props>()

interface Emits {
  (e: 'itemClick', item: any): void
  (e: 'newClick'): void
}
const emit = defineEmits<Emits>()

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
const { result, refetch, loading } = useQuery(props.query, variables)

watch(result, (newValue) => {
  if (newValue) {
    const key = Object.keys(newValue)[0]
    pagination.value.rowsNumber = newValue[key].paginatorInfo.total ?? 0
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

const rows = computed(() => {
  if (!result.value) {
    return []
  }
  const key = Object.keys(result.value)[0]
  return result.value[key].data ?? []
})
function onTableRowClick<TRow>(_: any, row: TRow) {
  emit('itemClick', row)
}
</script>
