<template>
  <template v-if="isFinalRoute">
    <q-card flat>
      <q-card-section>
        <q-table
          v-model:pagination="pagination"
          flat
          :rows="terminals"
          :columns="columns"
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
                <q-btn
                  color="primary"
                  :to="{ name: 'admin:terminals:register' }"
                >
                  Register New Terminal
                </q-btn>
              </q-btn-group>
            </div>
          </template>
          <template #body-cell-status="p">
            <q-td :props="p">
              <q-badge v-if="p.row.tokens.length" color="positive">
                Activated
              </q-badge>
              <q-badge v-else>Pending</q-badge>
            </q-td>
          </template>
          <template #body-cell-lastused="p">
            <q-td :props="p">
              <relative-time
                v-if="p.row.tokens.length && p.row.tokens[0].last_used_at"
                :date-time="DateTime.fromISO(p.row.tokens[0].last_used_at)"
              />
            </q-td>
          </template>
          <template #body-cell-actions="p">
            <q-td :props="p">
              <q-btn flat dense @click="onRevoke(p.row)">Revoke</q-btn>
            </q-td>
          </template>
          <template #loading>
            <q-inner-loading showing color="primary" />
          </template>
        </q-table>
      </q-card-section>
    </q-card>
  </template>
  <template v-else>
    <router-view />
  </template>
</template>

<script setup lang="ts">
import { useMutation, useQuery } from '@vue/apollo-composable'
import { DateTime } from 'luxon'
import type { QTableProps } from 'quasar'
import { useQuasar } from 'quasar'
import RelativeTime from 'src/components/atoms/RelativeTime.vue'
import {
  RevokeTerminalDocument,
  Terminal,
  TerminalsDocument,
} from 'src/generated/graphql'
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
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
const { result, refetch, loading } = useQuery(TerminalsDocument, variables)

watch(result, (newValue) => {
  if (newValue) {
    pagination.value.rowsNumber = newValue.terminals?.paginatorInfo.total ?? 0
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

const route = useRoute()
const terminals = computed(() => result.value?.terminals?.data ?? [])
const isFinalRoute = computed(() => route.name === 'admin:settings:terminal')

const columns: QTableProps['columns'] = [
  {
    name: 'name',
    field: 'name',
    label: 'Name',
    align: 'left',
  },
  {
    name: 'status',
    label: 'Status',
    field: 'tokens',
  },
  {
    name: 'lastused',
    label: 'Last Active',
    field: 'tokens',
  },
  {
    name: 'actions',
    field: '',
    label: '',
  },
]

const { dialog } = useQuasar()
const { mutate: revoke } = useMutation(RevokeTerminalDocument)
function onRevoke({ id }: Terminal) {
  dialog({
    title: 'Confirm',
    message:
      'Are you sure you want to revoke this terminal? (This action cannot be undone.)',
    cancel: true,
    persistent: true,
  }).onOk(() => {
    revoke({ id })
    refetch()
  })
}
</script>

<script lang="ts">
import { gql } from 'graphql-tag'

gql`
  query Terminals($page: Int, $search: String, $first: Int = 25) {
    terminals(page: $page, first: $first, search: $search) {
      paginatorInfo {
        currentPage
        total
      }
      data {
        id
        name
        tokens {
          name
          last_used_at
        }
      }
    }
  }
`

gql`
  mutation RevokeTerminal($id: ID!) {
    revokeTerminal(id: $id) {
      id
    }
  }
`
</script>
