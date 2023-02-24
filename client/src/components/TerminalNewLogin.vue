<template>
  <q-card-section>
    <div class="text-h5">Login</div>
    <q-form class="column q-gutter-sm" @submit="submitLogin">
      <VQWrap t-prefix="terminal.login">
        <VeeInput name="email" />
        <VeeInput name="password" type="password" />
      </VQWrap>
      <q-btn type="submit" label="Login" />
    </q-form>
  </q-card-section>
</template>

<script setup lang="ts">
import VeeInput from './atoms/VeeInput.vue'
import { QBtn, QCardSection, QForm } from 'quasar'
import { TerminalUser, useTerminalMutation } from 'src/composables/terminal'
import { LoginTerminalUserDocument } from 'src/generated/graphql'
import { useForm } from 'vee-validate'
import { object, string } from 'yup'
import VQWrap from './atoms/VQWrap.vue'

const emit = defineEmits<{
  (e: 'userLogin', user: TerminalUser): void
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
</script>

<script lang="ts">
import { gql } from 'graphql-tag'
gql`
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
`
</script>
