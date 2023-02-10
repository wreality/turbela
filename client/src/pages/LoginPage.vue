<template>
  <q-page class="flex flex-center">
    <q-card class="my-card" style="width: 600px" flat bordered>
      <q-card-section horizontal>
        <q-img
          class="col-4"
          src="https://cdn.quasar.dev/img/parallax2.jpg"
        ></q-img>
        <q-card-section class="col">
          <div class="flex items-center justify-center"></div>
          <login-form class="col-grow"></login-form>
        </q-card-section>
      </q-card-section>
    </q-card>
  </q-page>
</template>
<script setup lang="ts">
import LoginForm from 'src/components/forms/LoginForm.vue'
</script>
