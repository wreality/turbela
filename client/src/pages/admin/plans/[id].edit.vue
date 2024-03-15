<template>
  <q-card flat>
    <q-card-section>
      <PlanEditor :plan="plan" @submit="onSubmitPlanEditor" />
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import type { Plan } from 'src/gql/graphql'

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

setCrumbLabel(
  '/admin/plans/[id].edit',
  computed(() => plan.value?.name ?? '')
)

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
      name: '/admin/plans/[id]',
      params: { id: savedPlan.id as string },
    })
}
</script>

<script lang="ts">
graphql(`
  mutation UpdatePlan($name: String, $public: Boolean, $id: ID!) {
    updatePlan(input: { id: $id, name: $name, public: $public }) {
      id
      name
      public
    }
  }
`)

graphql(`
  query GetPlanEdit($id: ID!) {
    plan(id: $id) {
      id
      name
      public
    }
  }
`)
</script>
