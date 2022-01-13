<template lang="pug">
transition(
  mode='out-in',
  enter-active-class='animated flipInX animate__slow',
  leave-active-class='animated flipOutX animate__slow '
)
  div(v-if='!credentials.email', key='emailForm')
    .text-h5.text-center {{ $t('auth.headers.email') }}
    q-form.q-gutter-md(@submit='onSubmitEmail')
      q-input(
        ref='emailInput',
        v-model='form.email',
        :label='$t("auth.fields.email")',
        autocomplete='username',
        name='email',
        :error-message='$t("auth.errorConditions.INVALID_EMAIL")',
        :error='errorCondition === "INVALID_EMAIL"'
      )
      .flex-center.flex
        q-btn(
          :label='$t("auth.buttons.continue")',
          type='submit',
          color='primary'
        )
  div(v-else='', key='passwordForm')
    .text-center
      .text-h5 {{ $t('auth.headers.login') }}
      .text-subtitle {{ $t('auth.text.password') }}
    q-form.q-gutter-md(@submit='onSubmitLogin', @reset='resetData')
      .text-center.q-pt-md
        q-chip(size='md') {{ credentials.email }}
        q-btn.q-pl-md.text-caption(size='sm', flat, @click='resetData') Not you?
      input(
        type='hidden',
        name='email',
        :value='credentials.email',
        autocomplete='username'
      )
      q-input(
        ref='passwordInput',
        v-model='form.password',
        :label='$t("auth.fields.password")',
        :error-message='$t("auth.errorConditions.INVALID_CREDENTIALS")',
        :error='errorCondition === "INVALID_CREDENTIALS"',
        type='password',
        name='password',
        autocomplete='current-password'
      )
      .flex-center.flex
        q-btn(
          :label='$t("auth.buttons.login")',
          type='submit',
          color='primary'
        )
</template>

<script setup lang="ts">
import { reactive, ref, onMounted, watch } from 'vue'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'
import { useLogin } from 'src/composables/user'
import type { Credentials } from 'src/composables/user'

const emailInput = ref<HTMLInputElement>()
const passwordInput = ref<HTMLInputElement>()

const form = reactive<Credentials>({ email: '', password: '' })
const loading = ref(false)
const errorCondition = ref('')
const { loginUser, userExists, credentials, notMe } = useLogin()

async function onSubmitEmail() {
  loading.value = true
  errorCondition.value = ''

  try {
    const existing = await userExists(form.email)
    if (existing) {
      credentials.email = form.email
    } else {
      errorCondition.value = 'INVALID_EMAIL'
    }
  } catch (e: any) {
    errorCondition.value = e.message
  }

  loading.value = false
}

function resetData() {
  notMe()
  Object.assign(form, {
    email: '',
    password: '',
  })
  Object.assign(credentials, {
    email: '',
    password: '',
  })
}

const $q = useQuasar()
const $router = useRouter()

async function onSubmitLogin() {
  loading.value = true
  errorCondition.value = ''
  credentials.password = form.password
  const redirectUrl = $q.sessionStorage.getItem('loginRedirect') as string

  try {
    await loginUser()

    $q.sessionStorage.remove('loginRedirect')
    $router.push(redirectUrl ?? '/')
  } catch (e: any) {
    errorCondition.value = e.message
  }
  loading.value = false
}

onMounted(() => {})

watch(passwordInput, (newValue) => {
  if (newValue) {
    newValue.focus()
  }
})
</script>

<style lang="scss" scoped></style>
