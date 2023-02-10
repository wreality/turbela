<template>
  <div>
    <q-card>
      <q-card-section>
        <q-form @submit="submitHandler">
          <VQWrap
            class="column q-gutter-md"
            t-prefix="settings.terminal.register"
          >
            <VeeInput name="slug" />
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
import { RegisterTerminalDocument } from 'src/generated/graphql'
import { useMutation } from '@vue/apollo-composable'
import { useRouter } from 'vue-router'
const validationSchema = useTerminalSchema()

const form = useForm({ validationSchema })
const { mutate: register } = useMutation(RegisterTerminalDocument, {
  refetchQueries: ['Terminals'],
})
const { push } = useRouter()
const submitHandler = form.handleSubmit(async (values) => {
  const result = await register(values)

  push({ name: 'admin:settings:terminal' })
})
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
