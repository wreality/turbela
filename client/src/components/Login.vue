<template>
<q-card style="width: 600px" class="my-card " flat bordered>
      <q-card-section horizontal >
        <q-card-section class="col-5 q-pa-none">
            <q-img
            src="https://cdn.quasar.dev/img/parallax2.jpg"
            />
        </q-card-section>
        <q-card-section class="col";>
            <h5>Login</h5>
            <LoginForm />
        </q-card-section>
      </q-card-section>
    </q-card>
</template>

<script>
import LoginForm from 'src/components/forms/LoginForm.vue';
import {defineComponent} from 'vue';

export default defineComponent({
    components: { LoginForm },
    setup () {
        return {}
    }
});
</script>

<style lang="scss" scoped>

</style>
v3