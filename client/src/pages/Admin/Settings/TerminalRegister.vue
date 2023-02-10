<template>
  <div>
    <q-card flat>
      <q-card-section>
        <q-banner v-if="providedCodeError" class="bg-warning">
          The scanned code doesn't appear to be valid. Try again or
          <a href="#" @click.prevent="manualEntry"> enter the code manually.</a>
        </q-banner>
        <q-form v-else @submit="submitHandler">
          <VQWrap
            class="column q-gutter-md"
            t-prefix="settings.terminal.register"
          >
            <VeeInput v-show="providedCodeError === null" name="slug" />
            <VeeInput name="name" />
            <q-btn type="submit" color="primary" label="Register Terminal" />
          </VQWrap>
        </q-form>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import VQWrap from 'src/components/atoms/VQWrap.vue'
import VeeInput from 'src/components/atoms/VeeInput.vue'
import { useTerminalSchema } from 'src/composables/schemas'
import { useForm } from 'vee-validate'
import {
  RegisterTerminalDocument,
  RegisterTerminalMutationVariables,
} from 'src/generated/graphql'
import { useMutation } from '@vue/apollo-composable'
import { useRoute, useRouter } from 'vue-router'
import { ref, watch } from 'vue'

//Setup form
const validationSchema = useTerminalSchema()
const form = useForm({ validationSchema })
const providedCodeError = ref<null | boolean>(null)
const { params } = useRoute()
watch(
  () => params,
  () => {
    providedCodeError.value = null
    form.resetForm()
    if (params.slug && params.slug.length) {
      try {
        validationSchema.validateSyncAt('slug', { slug: params.slug })
        form.resetForm()
        form.setFieldValue('slug', params.slug)
        providedCodeError.value = false
      } catch (e) {
        providedCodeError.value = true
      }
    }
  },
  { immediate: true }
)

const { push } = useRouter()
const { mutate: register } = useMutation(RegisterTerminalDocument, {
  refetchQueries: ['Terminals'],
})
const submitHandler = form.handleSubmit(async (values) => {
  const result = await register(values as RegisterTerminalMutationVariables)

  push({ name: 'admin:settings:terminal' })
})

function manualEntry() {
  form.resetForm()
  providedCodeError.value = null
  push({ name: 'admin:terminals:register' })
}
</script>

<script lang="ts">
import { gql } from 'graphql-tag'

gql`
  mutation RegisterTerminal($name: String!, $slug: String!) {
    registerTerminal(input: { name: $name, slug: $slug }) {
      id
      name
    }
  }
`
</script>
