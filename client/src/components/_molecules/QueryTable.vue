<template>
  <q-table
    v-model:pagination="pagination"
    flat
    table-class="q-table--bordered"
    :rows="rows"
    :columns="tColumns"
    :loading="loading"
    :rows-per-page-options="[5, 25, 50, 100]"
    @request="onRequest"
  >
    <template #top="scope">
      <div class="col">
        <div class="row q-gutter-sm">
          <slot name="top-before" v-bind="scope" />
          <q-input
            v-if="searchable"
            v-model="filter"
            class="col"
            debounce="300"
            placeholder="Search"
            clearable
            :bottom-slots="false"
          >
            <template #prepend>
              <q-icon name="search" />
            </template>
          </q-input>
          <DateRangePicker
            v-if="timeRange"
            v-model="range"
            v-model:active-value="rangeActive"
            class="col"
          />
          <q-btn v-if="props.newTo" color="primary" :to="newTo">
            {{ t('btn.create') }}
          </q-btn>
          <q-btn v-else-if="props.onNew" color="primary" @click="$emit('new')">
            {{ t('btn.create') }}
          </q-btn>
          <q-btn icon="refresh" @click="refetch()" />
          <slot name="top-after" v-bind="scope" />
        </div>
      </div>
    </template>
    <template
      v-for="(_, slotName) in slots"
      #[slotName]="//@ts-ignore
    data"
    >
      <slot :name="slotName" v-bind="data"></slot>
    </template>
    <template
      v-for="column in compColumns"
      #[`body-cell-${column.name}`]="scope"
      :key="`body-cell-${column.name}`"
    >
      <component
        :is="getComponent(column.component)"
        v-if="column.component"
        :scope="scope"
      />
    </template>
  </q-table>
</template>

<script setup lang="ts">
import type { DocumentNode } from 'graphql'
import { DateTime } from 'luxon'
import type { QTableProps } from 'quasar'
import type { Component } from 'vue'
import type { RouteLocationRaw } from 'vue-router/auto'

export type TimeRange = {
  from: DateTime
  to: DateTime
}

interface Props {
  query: DocumentNode
  field?: string
  variables?: Record<string, any>
  newTo?: RouteLocationRaw
  columns: Column[]
  tPrefix?: string
  onNew?: () => void
  searchable?: boolean
  timeRange?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  searchable: true,
  field: '',
  variables: () => ({}),
  newTo: undefined,
  onNew: undefined,
  tPrefix: '',
  timeRange: false,
})

defineEmits(['new'])
const range = ref<TimeRange>({
  from: DateTime.now().minus({ days: 7 }),
  to: DateTime.now(),
})
const rangeActive = ref(false)
const { provide, t } = usei18nPrefix()

const slots = useSlots()
if (props.tPrefix) {
  provide(props.tPrefix)
}
const pagination = ref({
  sortBy: '',
  descending: false,
  page: 1,
  rowsPerPage: 25,
  rowsNumber: 0,
})

const filter = ref('')

const variables = computed(() => {
  return {
    ...(pagination.value.sortBy
      ? {
          orderBy: [
            {
              column: pagination.value.sortBy.toUpperCase(),
              order: pagination.value.descending ? 'DESC' : 'ASC',
            },
          ],
        }
      : {}),
    ...(range.value && rangeActive.value
      ? {
          range: {
            start: range.value.from
              .startOf('day')
              .toISO({ suppressMilliseconds: true }),
            end: range.value.to
              .endOf('day')
              .startOf('second')
              .toISO({ suppressMilliseconds: true }),
          },
        }
      : {}),
    ...props.variables,
    first: pagination.value.rowsPerPage,
    page: pagination.value.page,
    search: filter.value,
  }
})
const { result, refetch, loading } = useQuery(props.query, variables)

onMounted(() => {
  if (!loading.value) {
    refetch()
  }
})
watch(result, (newValue) => {
  if (newValue) {
    pagination.value.rowsNumber = getField(newValue)?.paginatorInfo.total ?? 0
  }
})

const onRequest: QTableProps['onRequest'] = (props) => {
  if (!props.pagination) {
    return
  }
  const { page, rowsPerPage, sortBy, descending } = props.pagination

  pagination.value.page = page ?? 1
  pagination.value.rowsPerPage = rowsPerPage ?? 25
  pagination.value.sortBy = sortBy
  pagination.value.descending = descending ?? false
}
const rows = computed(() => getField(result.value)?.data ?? [])

function getField(result: any) {
  if (!result) {
    return null
  }
  if (!props.field) {
    return result[Object.keys(result)[0]]
  }

  return props.field.split('.').reduce((o, i) => o[i], result)
}
const tColumns = computed(() => {
  if (!props.columns?.length ?? 0) {
    return []
  }
  return props.columns.map((c): ColumnProp => {
    return { ...c, label: c.label ? t('headers.' + c.label) : '' }
  })
})

const compColumns = computed(() => {
  if (!props.columns?.length ?? 0) {
    return []
  }

  return props.columns.filter((c) => c.component)
})

function getComponent(component: Component | string): Component {
  return typeof component === 'string'
    ? defineAsyncComponent(() => import(`./Tables/${component}Row.vue`))
    : component
}
defineExpose({
  refetch,
  rows,
})
</script>

<script lang="ts">
type Unpacked<T> = T extends (infer U)[] ? U : T
type ColumnExt = {
  component?: Component | string
}
type ColumnProp = Exclude<Unpacked<QTableProps['columns']>, undefined>

export type Column = ColumnProp & ColumnExt
</script>

<style scoped></style>
