<template>

  <q-page class="flex flex-center">
<q-card style="width: 600px" class="my-card " flat bordered>
      <q-card-section horizontal>
            <q-img class="col-4"
            src="https://cdn.quasar.dev/img/parallax2.jpg"
            />
        <q-card-section class="col">

            <div class="flex items-center justify-center">

            <LoginForm class="col-grow"/>
            </div>
        </q-card-section>
      </q-card-section>
    </q-card>

  </q-page>

</template>

<script>
import LoginForm from 'src/components/forms/LoginForm.vue';
import { defineComponent } from 'vue';

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