<template>
  <q-form class="" @submit="submitLogin">
    <CardHeader title="Login" />
    <q-card-section class="column q-gutter-sm q-my-sm">
      <VQWrap t-prefix="terminal.login">
        <VeeInput autofocus name="email" />
        <VeeInput name="password" type="password" />
      </VQWrap>
    </q-card-section>
    <div class="row">
      <q-btn
        v-if="!isCancelDisabled"
        class="col-2 q-py-lg"
        size="lg"
        label="Cancel"
        flat
        :disable="isCancelDisabled"
        @click="$emit('cancelLogin')"
      />
      <q-btn flat type="submit" class="col q-py-lg" size="lg" label="Login" />
    </div>
  </q-form>
</template>

<script setup lang="ts">
import {
  TerminalUser,
  useTerminalMutation,
  useTerminalStore,
} from 'src/composables/terminal'
import { LoginTerminalUserDocument } from 'src/gql/graphql'
import { useForm } from 'vee-validate'
import { computed } from 'vue'
import { object, string } from 'yup'
import VeeInput from '../_atoms/VeeInput.vue'
import VQWrap from '../_atoms/i18nPrefix.vue'
import CardHeader from '../_molecules/CardHeader.vue'

const emit = defineEmits<{
  (e: 'userLogin', user: TerminalUser): void
  (e: 'cancelLogin'): void
}>()
const schema = object({
  email: string().email().required().label('Email'),
  password: string().required().label('Password'),
})
const { handleSubmit } = useForm({
  validationSchema: schema,
  initialValues: {
    email: 'adminuser@turbela.dev',
    password: 'adminPassword!@#',
  },
})
const { mutate: login } = useTerminalMutation(LoginTerminalUserDocument)

const submitLogin = handleSubmit(async (values) => {
  const result = await login(values)

  const data = result?.data?.loginTerminalUser
  if (data) {
    emit('userLogin', { ...data.user, token: data.token })
  }
})
const { users } = useTerminalStore()

const isCancelDisabled = computed(() => users.value.length === 0)
</script>

<script lang="ts">
import { graphql } from 'src/gql'
graphql(`
  mutation LoginTerminalUser($email: String!, $password: String!) {
    loginTerminalUser(input: { email: $email, password: $password }) {
      user {
        id
        name
        email
        terminal_pincode
      }
      token
    }
  }
`)
</script>
