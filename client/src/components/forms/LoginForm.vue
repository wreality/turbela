<template>
  <q-form class="q-gutter-md" @submit="onSubmit">
    <q-input
      v-model="credentials.email"
      label="Email"
      lazy-rules
    />

    <q-input
      v-model="credentials.password"
      label="Your age *"
      lazy-rules
    />
    <div>
      <q-btn label="Login" type="submit" color="primary" />
    </div>
  </q-form>
</template>

<script>
import { defineComponent, reactive } from "vue";
import { useLogin } from "use/user";

export default defineComponent({
  name: 'LoginForm',
  setup() {
    const credentials = reactive({email: '', password: ''});
    const { loginUser } = useLogin();

    function onSubmit() {
        loginUser({email: credentials.email, password: credentials.password});
    }

    return { onSubmit, credentials };
  },
});
</script>

<style lang="scss" scoped>
</style>