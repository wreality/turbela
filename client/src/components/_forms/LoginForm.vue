<template>
  <transition
    mode="out-in"
    enter-active-class="animated flipInX animate__slow"
    leave-active-class="animated flipOutX animate__slow "
  >
    <div v-if="!credentials.email" key="emailForm">
      <div class="text-h5 text-center">{{ $t('auth.headers.email') }}</div>
      <q-form class="q-gutter-md" @submit="onSubmitEmail">
        <q-input
          ref="emailInput"
          v-model="form.email"
          :label="$t('auth.fields.email')"
          autocomplete="username"
          name="email"
          type="email"
          :error-message="$t('auth.errorConditions.INVALID_EMAIL')"
          :error="errorCondition === 'INVALID_EMAIL'"
        ></q-input>
        <div class="flex-center flex">
          <q-btn
            :label="$t('auth.buttons.continue')"
            type="submit"
            color="primary"
          ></q-btn>
        </div>
      </q-form>
    </div>
    <div v-else key="passwordForm">
      <div class="text-center">
        <div class="text-h5">{{ $t('auth.headers.login') }}</div>
        <div class="text-subtitle">{{ $t('auth.text.password') }}</div>
      </div>
      <q-form class="q-gutter-md" @submit="onSubmitLogin" @reset="resetData">
        <div class="text-center q-pt-md">
          <q-chip size="md">{{ credentials.email }}</q-chip>
          <q-btn class="q-pl-md text-caption" size="sm" flat @click="resetData"
            >Not you?</q-btn
          >
        </div>
        <input
          id="email"
          type="email"
          name="email"
          :value="credentials.email"
          autocomplete="username"
          style="display: none"
        />
        <q-input
          id="current-password"
          ref="passwordInput"
          v-model="form.password"
          :label="$t('auth.fields.password')"
          :error-message="$t('auth.errorConditions.INVALID_CREDENTIALS')"
          :error="errorCondition === 'INVALID_CREDENTIALS'"
          type="password"
          name="password"
          autocomplete="current-password"
        ></q-input>
        <div class="flex-center flex">
          <q-btn
            :label="$t('auth.buttons.login')"
            type="submit"
            color="primary"
          ></q-btn>
        </div>
      </q-form>
    </div>
  </transition>
</template>
<script setup lang="ts">
import { useQuasar } from 'quasar'
import type { Credentials } from 'src/composables/user'
import { useLogin } from 'src/composables/user'
import { onMounted, reactive, ref, watch } from 'vue'
import { useRouter } from 'vue-router'

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
