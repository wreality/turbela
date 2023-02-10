<template>
  <div>
    <template v-if="isFinalRoute">
      <q-btn color="primary" :to="{ name: 'admin:terminals:register' }">
        Register New Terminal
      </q-btn>
      <q-table :rows="terminals" :columns="columns" bordered>
        <template #body-cell-status="p">
          <q-td :props="p">
            <q-badge v-if="p.row.tokens.length" color="positive"
              >Activated</q-badge
            >
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
      </q-table>
    </template>
    <template v-else>
      <router-view />
    </template>
  </div>
</template>

<script setup lang="ts">
import { useQuery } from '@vue/apollo-composable'
import { TerminalsDocument } from 'src/generated/graphql'
import { useRoute } from 'vue-router'
import { useTimeoutPoll } from '@vueuse/core'
import { DateTime } from 'luxon'

const { result, refetch } = useQuery(TerminalsDocument)
const route = useRoute()
const terminals = computed(() => result.value?.terminals?.data ?? [])
const isFinalRoute = computed(() => route.name === 'admin:settings:terminal')

const columns = [
  {
    name: 'name',
    field: 'name',
    label: 'Name',
  },
  {
    name: 'status',
    label: 'Status',
  },
  {
    name: 'lastused',
    label: 'Last Active',
    value: 'tokens',
  },
  {
    name: 'actions',
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
import { computed } from 'vue'

gql`
  query Terminals {
    terminals {
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
