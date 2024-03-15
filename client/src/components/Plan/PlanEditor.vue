<template>
  <FormBuilder
    :validation-schema="schema"
    :initial-values="initialValues"
    :fields="fields"
    t-prefix="plans.edit"
  />
</template>

<script setup lang="ts">
import { pick } from 'lodash'
import type { Plan } from 'src/gql/graphql'

type PlanInput = Pick<Plan, 'name' | 'public'>

interface Props {
  plan?: PlanInput
}
const props = withDefaults(defineProps<Props>(), {
  plan: () => ({ name: '', public: false }),
})

const initialValues = computed(() => {
  return pick(props.plan, ['name', 'public'])
})
const schema = planSchema

const fields = [
  { name: 'name', type: 'input' },
  {
    name: 'public',
    type: 'toggle',
    props: { checkedIcon: 'check', color: 'primary', uncheckedIcon: 'clear' },
  },
]
</script>
