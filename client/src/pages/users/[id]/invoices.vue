<template>
  <div>
    <q-table
      :rows="invoices"
      :columns="columns"
      :loading="loading"
      row-key="id"
      flat
    >
      <template #body-cell-status="props">
        <q-td :props="props">
          <q-badge color="primary" :label="props.value" />
        </q-td>
      </template>

      <template #body-cell-actions="props">
        <q-td :props="props">
          <q-btn dense :to="`invoices/${props.value}`" label="View" />
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script setup lang="ts">
import type { User } from 'src/gql/graphql'

definePage({
  name: 'users:view:invoices',
  meta: {
    auth: {
      needsAbilities: 'view:User',
    },
    crumb: { label: 'Invoices', icon: 'money' },
    navigation: {
      icon: 'money',
      label: 'Invoices',
    },
  },
})

interface Props {
  user: User
}
const p = defineProps<Props>()

const variables = computed(() => ({ id: p.user.id }))
const { result, loading } = useQuery(UserInvoicesDocument, variables)

const invoices = computed(() => result.value?.user?.invoices ?? [])

const columns = [
  {
    name: 'status',
    label: 'Status',
    field: 'status',
  },
  {
    name: 'invoice-number',
    label: 'Invoice Number',
    field: 'number',
  },
  {
    name: 'amount-due',
    label: 'Due',
    field: 'amount_remaining',
    format: (val: number, row: Record<string, any>) =>
      format(val, row.currency),
  },
  {
    name: 'actions',
    field: 'id',
    label: '',
  },
]

const { format } = useMoneyFormatter()
</script>

<script lang="ts">
graphql(`
  query UserInvoices($id: ID!) {
    user(id: $id) {
      invoices {
        id
        number
        status
        amount_remaining
        currency
      }
    }
  }
`)
</script>
