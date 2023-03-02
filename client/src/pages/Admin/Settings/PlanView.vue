<template>
  <div v-if="!loading && plan" class="q-pa-md column q-gutter-md">
    <div class="col">
      <div class="text-h5">
        {{ plan.name }}
        <q-btn class="float-right" size="sm" @click="onEditBtnClick">
          Edit
        </q-btn>
      </div>
      <q-badge
        :class="{ 'bg-green': plan.public, 'bg-grey-9': !plan.public }"
        >{{ plan.public ? 'Public' : 'Hidden' }}</q-badge
      >
    </div>
    <div class="col">
      <div v-if="plan.stripe_id">
        <q-card class="bg-gray-1">
          <q-card-section>
            <q-badge>Stripe: {{ plan.stripe_id }}</q-badge>
            <q-btn flat :href="stripeUrl" size="sm">View in Stripe</q-btn>
            <q-btn flat size="sm" @click="assignNewStripeId"
              >Select New Stripe Product</q-btn
            >
          </q-card-section>
          <q-card-section>Name: {{ plan.stripe_data?.name }}</q-card-section>
          <q-card-section>
            Prices:

            <div v-for="price in plan.stripe_data?.prices" :key="price.id">
              {{ price.recurring?.interval_count }}
              {{ price.recurring?.interval }}:
              {{ formatMoney(price.unit_amount, price.currency) }}
            </div>
          </q-card-section>
        </q-card>
      </div>
      <q-banner v-else class="bg-warning">
        This plan does not have an associated stripe product. Click below to
        choose a stripe product to associate with this plan.
        <template #action>
          <q-btn
            class="bg-primary text-white"
            label="Choose Stripe Product"
            @click="assignNewStripeId"
          ></q-btn>
        </template>
      </q-banner>
    </div>
    <div class="col">
      <div class="row">
        <div class="col-12 config-section-header shadow-3">Grants</div>
      </div>
    </div>
    <div class="col">
      <div class="row q-col-gutter-md flex">
        <PlanFeatures
          :features="plan?.features ?? []"
          :plan-id="plan.id"
        ></PlanFeatures>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMutation, useQuery } from '@vue/apollo-composable'
import { useQuasar } from 'quasar'
import PlanFeatures from 'src/components/PlanFeatures.vue'
import SelectStripeProductDialog from 'src/components/dialogs/SelectStripeProductDialog.vue'
import { useBreadcrumbTags } from 'src/composables/breadcrumbs'
import { useMoneyFormatter } from 'src/composables/money'
import {
  GetPlanDocument,
  UpdatePlanStripeIdDocument,
} from 'src/generated/graphql'
import { computed } from 'vue'
interface Props {
  id: string
}
const { format: formatMoney } = useMoneyFormatter()
const props = defineProps<Props>()

//Plan loading
const { result, loading } = useQuery(GetPlanDocument, props)
const plan = computed(() => result.value?.getPlan)

//Breadcrumbs Replacement
const { setTag } = useBreadcrumbTags()
const router = useRouter()

const planName = computed(() => result.value?.getPlan?.name ?? '')
const stripeUrl = computed(() =>
  plan.value?.stripe_id
    ? `https://dashboard.stripe.com/${
        plan.value?.stripe_data?.livemode ? '' : 'test/'
      }products/${plan.value.stripe_id}`
    : ''
)
setTag('#plan_name', planName)
const q = useQuasar()
const { mutate: updateStripeId } = useMutation(UpdatePlanStripeIdDocument)
function assignNewStripeId() {
  q.dialog({
    component: SelectStripeProductDialog,
  }).onOk((stripeId) => {
    if (plan.value) {
      updateStripeId({ id: plan.value.id, ...stripeId })
    }
  })
}

const { push } = useRouter()
function onEditBtnClick() {
  push({
    name: 'admin:memberships:edit',
    params: { id: props.id },
  })
}
</script>

<script lang="ts">
import { gql } from 'graphql-tag'
import { useRouter } from 'vue-router'
const stripeDataFragment = gql`
  fragment StripeDataFragment on Plan {
    stripe_id
    stripe_data {
      livemode
      name
      prices {
        id
        currency
        unit_amount
        nickname
        recurring {
          interval
          interval_count
        }
      }
    }
  }
`

gql`
  query GetPlan($id: ID!) {
    getPlan(id: $id) {
      id
      name
      public
      ...StripeDataFragment
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
  ${stripeDataFragment}
`

gql`
  mutation UpdatePlanStripeId($id: ID!, $stripe_id: String) {
    updatePlan(input: { id: $id, stripe_id: $stripe_id }) {
      id
      ...StripeDataFragment
    }
  }
  ${stripeDataFragment}
`
</script>
