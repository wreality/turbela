<template>
  <div class="column q-gutter-md">
    <div>{{ result }}</div>
    <VeeSelect
      v-model="selectedPlan"
      name="plan"
      :options="planOptions"
      label="Membership"
      emit-value
    />
    <VeeSelect
      v-if="priceOptions"
      :options="priceOptions"
      label="Price"
      name="price"
      emit-value
    />
  </div>
</template>

<script setup lang="ts">
import type { User } from 'src/gql/graphql'

definePage({
  name: 'users:view:membership',
  meta: {
    appIcon: 'badge',
    auth: {
      needsAbilities: 'view:User',
    },
    crumb: { label: 'Membership' },
    navigation: {
      label: 'Membership',
    },
  },
})
interface Props {
  user: User
}

const p = defineProps<Props>()

const selectedPlan = ref()
const variables = computed(() => ({ id: p.user.id }))
const { result } = useQuery(UserMembershipDocument, variables)

const { format } = useMoneyFormatter()

const { result: membershipsResult } = useQuery(PriceTreeDocument)

const planOptions = computed(() => {
  if (!membershipsResult.value?.getPlans) {
    return []
  }
  return membershipsResult.value.getPlans.data.map((v) => {
    return {
      label: v.stripe_data?.name,
      value: v.id,
    }
  })
})

const priceOptions = computed(() => {
  if (selectedPlan.value === null) {
    return null
  }
  const membership = membershipsResult.value?.getPlans?.data.find(
    (v) => v.id === selectedPlan.value
  )
  if (!membership?.stripe_data?.prices) {
    return null
  }
  return membership.stripe_data?.prices.map((v) => ({
    value: v.id,
    label: v.nickname
      ? v.nickname
      : `${v.recurring?.interval_count} ${v.recurring?.interval}: ${format(
          v.unit_amount,
          v.currency
        )}`,
  }))
})
</script>

<script lang="ts">
graphql(`
  query UserMembership($id: ID!) {
    user(id: $id) {
      subscription {
        stripe_status
      }
    }
  }
`)

graphql(`
  query PriceTree {
    plans {
      data {
        id
        name
        stripe_data {
          id
          name
          prices {
            id
            nickname
            unit_amount
            currency
            recurring {
              interval
              interval_count
            }
          }
        }
      }
    }
  }
`)
</script>
