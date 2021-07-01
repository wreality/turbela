<template>
<transition
  appear
  mode="out-in"
  enter-active-class="animated flipInX animate__slow"
  leave-active-class="animated flipOutX animate__slow "
>
  <div  v-if="!credentials.email" key="emailForm"  >
    <div class="text-h5 text-center">{{ $t('auth.headers.email')}}</div>
    <q-form class="q-gutter-md" @submit="onSubmitEmail">
      <q-input
        ref="emailInput"
        v-model="form.email"
        :label="$t('auth.fields.email')"
        lazy-rules
        autocomplete="username"
        name="email"
        :error-message="$t('auth.errorConditions.INVALID_EMAIL')"
        :error="errorCondition === 'INVALID_EMAIL'"
      />
      <div class="flex-center flex">
        <q-btn :label="$t('auth.buttons.continue')" type="submit" color="primary" />
      </div>
    </q-form>
  </div>
  <div v-else key="passwordForm">
    <div class="text-center">
      <div class="text-h5">{{ $t('auth.headers.login')}}</div>
      <div class="text-subtitle">{{ $t('auth.text.password') }}</div>
    </div>
    <q-form  class="q-gutter-md" @submit="onSubmitLogin" @reset="resetData">
      <div class=" text-center q-pt-md">

      <q-chip size="md">{{credentials.email}}</q-chip>
      <q-btn size="sm" flat class="q-pl-md text-caption" @click="resetData">Not you?</q-btn>
      </div>
      <input type="hidden" name="email" :value="credentials.email" autocomplete="username"/>
      <q-input
        ref="passwordInput"
        v-model="form.password"
        :label="$t('auth.fields.password')"
        :error-message="$t('auth.errorConditions.INVALID_CREDENTIALS')"
        :error="errorCondition === 'INVALID_CREDENTIALS'"
        type="password"
        name="password"
        lazy-rules
        autocomplete="current-password"
      />
      <div class="flex-center flex">
        <q-btn :label="$t('auth.buttons.login')" type="submit" color="primary" />
      </div>
    </q-form>
  </div>
</transition>
</template>

<script>
import { defineComponent, reactive, ref, onMounted, watch, nextTick } from "vue";
import { useLogin } from "use/user";

export default defineComponent({
  name: 'LoginForm',
  setup() {
    // Form field refs
    const emailInput = ref(null);
    const passwordInput = ref(null);

    const form = reactive({email: '', password: ''});
    const loading = ref(false);
    const errorCondition = ref('');
    const { loginUser, userExists, credentials, notMe } = useLogin();

    async function onSubmitEmail() {
      loading.value = true;
      errorCondition.value = '';

      try {
        const existing = await userExists(form.email);
        console.log(existing);
        if (existing) {
          credentials.email = form.email;
        } else {
          errorCondition.value = "INVALID_EMAIL";
        }
      } catch (e) {
        errorCondition.value = e.message;
        console.log(e.message);
      }

      loading.value = false;
    }

     function resetData() {
      notMe();
      Object.assign(form, {
        email: '',
        password: ''
      });
      Object.assign(credentials, {
        email: '',
        password: ''
      });
    }

    async function onSubmitLogin() {
      loading.value = true;
      errorCondition.value = '';
      credentials.password = form.password;

      try {
        await loginUser();
      } catch (e) {
        errorCondition.value = e.message
      }
      loading.value = false;
    }

    onMounted(() => {
      });

        watch(passwordInput, (newValue) => {
          if (newValue) {
            passwordInput.value.focus();
          }
        });

        watch(emailInput, (newValue) => {
          if (newValue) {
            emailInput.value.focus();
          }
        })



    return {
      onSubmitEmail,
      onSubmitLogin,
      resetData,
      form,
      credentials,
      errorCondition,
      loading,
      emailInput,
      passwordInput
    };
  },
});
</script>

<style lang="scss" scoped>
</style>