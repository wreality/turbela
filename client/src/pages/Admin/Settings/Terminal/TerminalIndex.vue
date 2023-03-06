<template>
  <q-card flat>
    <q-card-section>
      <query-table
        :query="TerminalsDocument"
        :columns="columns"
        new-label="Register Terminal"
        :new-to="{ name: 'admin:terminals:register' }"
        t-prefix="settings.terminal.index.table"
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
            <span v-else>Never</span>
          </q-td>
        </template>
        <template #body-cell-actions="p">
          <q-td :props="p">
            <q-btn flat dense @click="onRevoke(p.row)">Revoke</q-btn>
          </q-td>
        </template>
      </query-table>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { useMutation } from '@vue/apollo-composable'
import { DateTime } from 'luxon'
import type { QTableProps } from 'quasar'
import { useQuasar } from 'quasar'
import RelativeTime from 'src/components/_atoms/RelativeTime.vue'
import QueryTable from 'src/components/_molecules/QueryTable.vue'
import {
  RevokeTerminalDocument,
  Terminal,
  TerminalsDocument,
} from 'src/generated/graphql'

const columns: QTableProps['columns'] = [
  {
    name: 'name',
    field: 'name',
    label: 'name',
    align: 'left',
  },
  {
    name: 'status',
    label: 'status',
    field: 'tokens',
  },
  {
    name: 'lastused',
    label: 'active',
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
