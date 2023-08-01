<template>
  <q-card flat>
    <q-card-section>
      <PlanEditor :plan="plan" @submit="onSubmitPlanEditor" />
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { useMutation, useQuery } from '@vue/apollo-composable'
import PlanEditor from 'src/components/Plan/PlanEditor.vue'
import { useBreadcrumbTags } from 'src/composables/breadcrumbs'
import {
  GetPlanEditDocument,
  Plan,
  UpdatePlanDocument,
} from 'src/generated/graphql'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

interface Props {
  id: string
}
const props = defineProps<Props>()

const { push } = useRouter()

const plan = (() => {
  const { result } = useQuery(GetPlanEditDocument, props)
  return computed(() => {
    if (!result.value?.plan) {
      return { name: '', public: false }
    }
    return result.value.plan
  })
})()

//Set breadcrumbs tag (without exposing to template)
;(() => {
  const { setTag } = useBreadcrumbTags()
  setTag(
    '#plan_name',
    computed(() => {
      return plan.value?.name ?? ''
    })
  )
})()

const mutation = useMutation(UpdatePlanDocument)

//const validationSchema = usePlanSchema()

async function onSubmitPlanEditor(values: Pick<Plan, 'name' | 'public'>) {
  const variables = Object.assign({ ...values }, props)

  const result = await mutation.mutate(variables, {
    refetchQueries: ['GetPlans', 'GetPlanEdit', 'GetPlan'],
  })
  const savedPlan = Object.values(result?.data ?? {})[0]
  if (typeof savedPlan === 'object' && savedPlan?.id)
    push({
      name: 'admin:memberships:view',
      params: { id: savedPlan.id as string },
    })
}
</script>

<script lang="ts">
import { gql } from 'graphql-tag'

gql`
  mutation UpdatePlan($name: String, $public: Boolean, $id: ID!) {
    updatePlan(input: { id: $id, name: $name, public: $public }) {
      id
      name
      public
    }
  }
`

gql`
  query GetPlanEdit($id: ID!) {
    plan(id: $id) {
      id
      name
      public
    }
  }
`
</script>
