<template>
  <q-card flat>
    <q-card-section>
      <PlanEditor @submit="onSubmitPlanEditor" />
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import type { CreatePlanMutationVariables } from 'src/gql/graphql'

const { push } = useRouter()

const mutation = useMutation(CreatePlanDocument)

async function onSubmitPlanEditor(values: CreatePlanMutationVariables) {
  const result = await mutation.mutate(values, {
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
  mutation CreatePlan($name: String!, $public: Boolean!) {
    createPlan(input: { name: $name, public: $public }) {
      id
    }
  }
`)
</script>
