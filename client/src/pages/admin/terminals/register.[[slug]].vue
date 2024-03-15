<template>
  <div>
    <q-card flat>
      <q-card-section>
        <q-banner v-if="providedCodeError" class="bg-warning">
          The scanned code doesn't appear to be valid. Try again or
          <a href="#" @click.prevent="manualEntry">enter the code manually.</a>
        </q-banner>
        <VeeForm
          v-else
          class="column q-gutter-md"
          t-prefix="settings.terminal.register"
          @submit="submitHandler"
        >
          <VeeInput v-show="providedCodeError === null" name="slug" />
          <VeeInput name="name" />
          <q-btn
            class="col"
            type="submit"
            color="primary"
            label="Register Terminal"
          />
        </VeeForm>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import type { RegisterTerminalMutationVariables } from 'src/gql/graphql'

//Setup form
const form = useForm({ validationSchema: terminalSchema })
const providedCodeError = ref<null | boolean>(null)
const { params } = useRoute('/admin/terminals/register.[[slug]]')
watch(
  () => params,
  () => {
    providedCodeError.value = null
    form.resetForm()
    if ('slug' in params && params.slug?.length) {
      try {
        terminalSchema.validateSyncAt('slug', { slug: params.slug })
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

  push({ name: '/admin/terminals/' })
})

function manualEntry() {
  form.resetForm()
  providedCodeError.value = null
  push({ name: '/admin/terminals/register.[[slug]]' })
}
</script>

<script lang="ts">
graphql(`
  mutation RegisterTerminal($name: String!, $slug: String!) {
    registerTerminal(input: { name: $name, slug: $slug }) {
      id
      name
    }
  }
`)
</script>
