<template lang="pug">
.q-pa-md.column.q-gutter-md(v-if='!loading && plan')
  .col
    h5 {{ plan.name }}
    .column
      .row.col
        .col-2.text-bold Duration
        .col {{ planDuration?.toHuman() }}
      .row.col
        .col-2.text-bold Price
        .col {{ planPrice }}
  .col
    .row
      .col-12.config-section-header.shadow-3
        | Grants
  .col
    .row.q-col-gutter-md.flex
      PlanFeatures(:features='plan?.features ?? []', :plan-id='plan.id')
</template>

<script setup lang="ts">
import { toRef, computed } from 'vue'
import { useQuery, useResult } from '@vue/apollo-composable'
import { useMoneyFormatter } from 'src/composables/money'
import { useBreadcrumbTags } from 'src/composables/breadcrumbs'
import { Duration } from 'luxon'
import PlanFeatures from 'src/components/PlanFeatures.vue'
import { GetPlanDocument } from 'src/generated/graphql'

interface Props {
  id: string
}

const props = defineProps<Props>()

//Plan loading
const { result, loading } = useQuery(GetPlanDocument, props)
const plan = useResult(result)

//Breadcrumbs Replacement
const { setTag } = useBreadcrumbTags()
const planName = useResult(result, '', (data) => data.getPlan.name)
setTag('#plan_name', planName)

//Plan price formatting
const { format } = useMoneyFormatter()
const planPrice = computed(() => {
  return plan.value
    ? plan.value.price.map((p) => format(p.amount, p.currency)).join(' + ')
    : ''
})

//Plan duration formatting
const planDuration = computed(() => {
  return plan.value ? Duration.fromISO(plan.value.duration) : null
})
</script>

<script lang="ts">
import { gql } from 'graphql-tag'
gql`
  query GetPlan($id: ID!) {
    getPlan(id: $id) {
      id
      name
      duration
      price {
        currency
        amount
      }
      features {
        id
        name
        type
        slug
        parameters {
          amount
        }
      }
    }
  }
`
</script>
