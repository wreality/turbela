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
            <div class="column">
              <q-btn color="primary" :to="{ name: 'admin:terminals:register' }">
                Register New Terminal
              </q-btn>
              <q-input
                v-model="filter"
                borderless
                dense
                debounce="300"
                placeholder="Search"
              >
                <template #append>
                  <q-icon name="search" />
                </template>
              </q-input>
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
              {{
                p.row.tokens?.[0]?.last_used_at
                  ? DateTime.fromISO(p.row.tokens[0].last_used_at).toRelative()
                  : ''
              }}
            </q-td>
          </template>
          <template #body-cell-actions="p">
            <q-td :props="p">
              <q-btn dense>Revoke</q-btn>
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
import { computed, ref, watch } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import { TerminalsDocument } from 'src/generated/graphql'
import { useRoute } from 'vue-router'
import { useTimeoutPoll } from '@vueuse/core'
import { DateTime } from 'luxon'

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

function onRequest(props) {
  console.log(props)
  const { page, rowsPerPage, sortBy, descending } = props.pagination
  const filter = props.filter

  pagination.value.page = page
  pagination.value.rowsPerPage = rowsPerPage
}
const route = useRoute()
const terminals = computed(() => result.value?.terminals?.data ?? [])
const isFinalRoute = computed(() => route.name === 'admin:settings:terminal')

const columns = [
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
useTimeoutPoll(
  async () => {
    await refetch()
  },
  10000,
  { immediate: true }
)
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
        name
        tokens {
          name
          last_used_at
        }
      }
    }
  }
`
</script>
