<template lang="pug">
.q-pa-md
  VQWrap.column.q-gutter-md(@vqupdate='onVqupdate', tPrefix='plans.edit')
    VQInput.col(:v='$v.name')

    q-toggle(
      v-model='$v.public.$model',
      checked-icon='check',
      color='primary',
      label='Publically Available',
      unchecked-icon='clear'
    )

    FormActions(
      :formState='formState',
      :isNew='props.id === null',
      @save-click='savePlan',
      @reset-click='resetData'
    )
</template>

<script setup lang="ts">
import VQWrap from 'src/components/atoms/VQWrap.vue'
import VQInput from 'src/components/atoms/VQInput.vue'
import FormActions from 'src/components/molecules/FormActions.vue'

import { reactive, computed, watch, watchEffect } from 'vue'

import { required } from '@vuelidate/validators'

import { useMutation, useQuery, useApolloClient } from '@vue/apollo-composable'
import { useFormState } from 'src/composables/forms'
import { useVuelidate } from '@vuelidate/core'
import { useRouter } from 'vue-router'
import type { Validation, ValidationArgs } from '@vuelidate/core'
import {
  CreatePlanDocument,
  UpdatePlanDocument,
  GetPlanEditDocument,
} from 'src/generated/graphql'

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
let mutation

if (props.id === null) {
  mutation = useMutation(CreatePlanDocument)
} else {
  mutation = useMutation(UpdatePlanDocument)
  resetData()
}

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
    name: result.data.getPlan.name,
    public: result.data.getPlan.public,
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
  const keys = Object.keys(result.data)
  push({
    name: 'admin:setup:memberships:view',
    params: { id: result.data[keys[0]].id },
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
