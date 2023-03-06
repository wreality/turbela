<template>
  <q-table
    v-model:pagination="pagination"
    flat
    :rows="rows"
    :columns="tColumns"
    :loading="loading"
    :rows-per-page-options="[5, 25, 50, 100]"
    @request="onRequest"
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
          <q-btn v-if="newTo" color="primary" :to="newTo">
            {{ $t(fullKey('btn.create')) }}
          </q-btn>
        </q-btn-group>
      </div>
    </template>
    <template
      v-for="(slot, index) in Object.keys($slots)"
      #[slot]="data"
      :key="index"
    >
      <slot :name="slot" v-bind="data"></slot>
    </template>
  </q-table>
</template>

<script setup lang="ts">
import { useQuery } from '@vue/apollo-composable'
import { computed, ref, watch } from 'vue'

import { DocumentNode } from 'graphql'
import { QTableProps } from 'quasar'
import { usei18nPrefix } from 'src/composables/i18nPrefix'
import { useI18n } from 'vue-i18n'
import { RouteLocationRaw } from 'vue-router'

interface Props extends QTableProps {
  query: DocumentNode
  newTo?: RouteLocationRaw
  columns: QTableProps['columns']
  tPrefix?: string
}
const props = defineProps<Props>()

const { provide, fullKey } = usei18nPrefix()

if (props.tPrefix) {
  provide(props.tPrefix)
}
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
    pagination.value.rowsNumber = getField(newValue)?.paginatorInfo.total ?? 0
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
const rows = computed(() => getField(result.value)?.data ?? [])

function getField(result: any) {
  if (!result) {
    return null
  }
  return result[Object.keys(result)[0]]
}
const { t } = useI18n()
const tColumns = computed(() =>
  props.columns.map((c) =>
    Object.assign(c, { label: c.label ? t(fullKey('headers.' + c.label)) : '' })
  )
)
</script>

<style scoped></style>
