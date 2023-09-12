<template>
  <FormBuilder
    :validation-schema="planSchema"
    :initial-values="initialValues"
    :fields="fields"
    t-prefix="plans.edit"
  />
</template>

<script setup lang="ts">
import { pick } from 'lodash'
import { planSchema } from 'src/composables/schemas/plan'
import { Plan } from 'src/gql/graphql'
import { computed } from 'vue'
import FormBuilder from '../_molecules/FormBuilder.vue'

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

const fields = [
  { name: 'name', type: 'input' },
  {
    name: 'public',
    type: 'toggle',
    props: { checkedIcon: 'check', color: 'primary', uncheckedIcon: 'clear' },
  },
]
</script>
