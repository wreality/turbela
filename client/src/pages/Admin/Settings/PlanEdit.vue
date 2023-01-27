<template lang="pug">
.q-pa-md
  VQWrap.column.q-gutter-md(@vqupdate='onVqupdate')
    VQInput.col(:v='$v.name', label='Plan Name')
    DurationInput(
      v-model='$v.duration.$model',
      :error='$v.duration.$error',
      :errors='$v.duration.$errors'
    )
    q-toggle(
      v-model='$v.public.$model',
      checked-icon='check',
      color='primary',
      label='Publically Available',
      unchecked-icon='clear'
    )
    PlanPriceInput(v-model='$v.price.$model')
    FormActions(:formState='formState')
</template>

<script setup lang="ts">
import VQWrap from 'src/components/atoms/VQWrap.vue'
import VQInput from 'src/components/atoms/VQInput.vue'
import DurationInput from 'src/components/molecules/DurationInput.vue'
import PlanPriceInput from 'src/components/molecules/PlanPriceInput.vue'
import FormActions from 'src/components/molecules/FormActions.vue'

import { reactive, computed } from 'vue'
import {
  hasPrice,
  isDuration,
  notEmptyDuration,
} from 'src/composables/validators'
import { required } from '@vuelidate/validators'

//import { useQuery, useMutation } from '@vue/apollo-composable'
import { useFormState } from 'src/composables/forms'
import { useVuelidate } from '@vuelidate/core'

import type { Validation, ValidationArgs } from '@vuelidate/core'
import type { Plan } from 'src/generated/graphql'

const props = defineProps({
  id: {
    type: String,
    required: false,
    default: null,
  },
})

const form = reactive<Pick<Plan, 'name' | 'duration' | 'price' | 'public'>>({
  name: '',
  duration: '',
  price: [],
  public: false,
})
const rules = {
  name: { required },
  duration: { required, isDuration, notEmptyDuration },
  price: { hasPrice },
  public: {},
}

const $v = useVuelidate(rules, form)

const { formState } = useFormState({ validator: $v })

function onVqupdate(validator: Validation, newValue: any) {
  validator.$model = newValue
}
</script>

<script lang="ts">
import { gql } from 'graphql-tag'

gql`
  mutation CreatePlan(
    $name: String!
    $price: [PriceInput!]!
    $public: Boolean!
    $duration: String!
  ) {
    createPlan(
      input: {
        name: $name
        price: $price
        public: $public
        duration: $duration
      }
    ) {
      id
    }
  }
`
</script>
