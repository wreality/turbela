<template>
  <template v-if="isFinalRoute">
    <q-card flat>
      <q-card-section>
        <model-table
          :query="TerminalsDocument"
          :columns="columns"
          new-label="Register Terminal"
          @new-click="onNewClick"
        >
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
        </model-table>
      </q-card-section>
    </q-card>
  </template>
  <template v-else>
    <router-view />
  </template>
</template>

<script setup lang="ts">
import { useMutation } from '@vue/apollo-composable'
import { DateTime } from 'luxon'
import type { QTableProps } from 'quasar'
import { useQuasar } from 'quasar'
import ModelTable from 'src/components/ModelTable.vue'
import RelativeTime from 'src/components/_atoms/RelativeTime.vue'
import {
  RevokeTerminalDocument,
  Terminal,
  TerminalsDocument,
} from 'src/generated/graphql'
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
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
  })
}
const { push } = useRouter()
function onNewClick() {
  push({ name: 'admin:terminals:register' })
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
