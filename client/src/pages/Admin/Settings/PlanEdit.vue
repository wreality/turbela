<template>
  <div class="q-pa-md">
    <VQWrap
      class="column q-gutter-md"
      t-prefix="plans.edit"
      @vqupdate="onVqupdate"
    >
      <VQInput class="col" :v="$v.name"></VQInput>
      <q-toggle
        v-model="$v.public.$model"
        checked-icon="check"
        color="primary"
        label="Publically Available"
        unchecked-icon="clear"
      ></q-toggle>
      <FormActions
        :form-state="formState"
        :is-new="props.id === null"
        @save-click="savePlan"
        @reset-click="resetData"
      />
    </VQWrap>
  </div>
</template>

<script setup lang="ts">
import VQInput from 'src/components/atoms/VQInput.vue'
import VQWrap from 'src/components/atoms/VQWrap.vue'
import FormActions from 'src/components/molecules/FormActions.vue'

import { reactive } from 'vue'

import { required } from '@vuelidate/validators'

import { useApolloClient, useMutation } from '@vue/apollo-composable'
import type { Validation } from '@vuelidate/core'
import { useVuelidate } from '@vuelidate/core'
import { useFormState } from 'src/composables/forms'
import {
  CreatePlanDocument,
  GetPlanEditDocument,
  UpdatePlanDocument,
} from 'src/generated/graphql'
import { useRouter } from 'vue-router'

import type { Plan } from 'src/generated/graphql'
const props = defineProps({
  id: {
    type: String,
    required: false,
    default: null,
  },
})

const form = reactive<Pick<Plan, 'name' | 'public'>>({
  name: '',
  public: false,
})
const rules = {
  name: { required },
  public: {},
}
const { push } = useRouter()
const { resolveClient } = useApolloClient()
const apolloClient = resolveClient()
const $v = useVuelidate(rules, form)
const document = props.id === null ? CreatePlanDocument : UpdatePlanDocument
const mutation = useMutation(document)

const { formState } = useFormState({ validator: $v, mutation })

function onVqupdate(validator: Validation, newValue: any) {
  validator.$model = newValue
}

async function resetData() {
  const result = await apolloClient.query({
    query: GetPlanEditDocument,
    variables: { id: props.id },
  })
  Object.assign(form, {
    name: result.data.getPlan?.name ?? '',
    public: result.data.getPlan?.public ?? false,
  })
  $v.value.$reset()
}

async function savePlan() {
  const variables = { ...form } as any
  if (props.id !== null) {
    variables.id = props.id
  }
  const result = await mutation.mutate(variables, {
    refetchQueries: ['GetPlans'],
  })
  const savedPlan = Object.values(result?.data ?? {})[0]
  if (typeof savedPlan === 'object' && savedPlan?.id)
    push({
      name: 'admin:setup:memberships:view',
      params: { id: savedPlan.id as string },
    })
}
</script>

<script lang="ts">
import { gql } from 'graphql-tag'

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
