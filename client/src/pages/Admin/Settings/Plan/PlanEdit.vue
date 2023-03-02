<template>
  <div class="q-pa-md">
    <q-form class="column q-gutter-md" @submit="onSaveClick">
      <VQWrap t-prefix="plans.edit">
        <VeeInput name="name" />
        <VeeToggle
          name="public"
          checked-icon="check"
          color="primary"
          unchecked-icon="clear"
        ></VeeToggle>
        <FormActions />
      </VQWrap>
    </q-form>
  </div>
</template>

<script setup lang="ts">
import { useMutation, useQuery } from '@vue/apollo-composable'
import VQWrap from 'components/_atoms/i18nPrefix.vue'
import VeeInput from 'components/_atoms/VeeInput.vue'
import VeeToggle from 'components/_atoms/VeeToggle.vue'
import FormActions from 'components/_molecules/FormActions.vue'
import { useBreadcrumbTags } from 'src/composables/breadcrumbs'
import { usePlanSchema } from 'src/composables/schemas'
import {
  CreatePlanDocument,
  GetPlanEditDocument,
  UpdatePlanDocument,
} from 'src/generated/graphql'
import { useForm } from 'vee-validate'
import { useRouter } from 'vue-router'
interface Props {
  id: string | null
}
const props = withDefaults(defineProps<Props>(), { id: null })

const { push } = useRouter()

const document = props.id === null ? CreatePlanDocument : UpdatePlanDocument
const mutation = useMutation(document)

const { result } = useQuery(GetPlanEditDocument, props as any) //Props id is required, but may not be present.  But, we're fine with that error

const plan = computed(() => {
  if (!result.value?.getPlan) {
    return { name: '', public: false }
  }
  return pick(result.value.getPlan, ['name', 'public'])
})
const { setTag } = useBreadcrumbTags()
setTag(
  '#plan_name',
  computed(() => {
    return plan.value.name
  })
)
const validationSchema = usePlanSchema()
const { handleSubmit, resetForm } = useForm({
  validationSchema,
  initialValues: plan,
})

onUpdated(() => {
  resetForm()
})

const onSaveClick = handleSubmit(async (values) => {
  const variables = { ...values } as any
  if (props.id !== null) {
    variables.id = props.id
  }
  const result = await mutation.mutate(variables, {
    refetchQueries: ['GetPlans', 'GetPlanEdit', 'GetPlan'],
  })
  const savedPlan = Object.values(result?.data ?? {})[0]
  if (typeof savedPlan === 'object' && savedPlan?.id)
    push({
      name: 'admin:memberships:view',
      params: { id: savedPlan.id as string },
    })
})
</script>

<script lang="ts">
import { gql } from 'graphql-tag'
import { pick } from 'lodash'
import { computed, onUpdated } from 'vue'

gql`
  mutation CreatePlan($name: String!, $public: Boolean!) {
    createPlan(input: { name: $name, public: $public }) {
      id
    }
  }
`

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
    getPlan(id: $id) {
      id
      name
      public
    }
  }
`
</script>
