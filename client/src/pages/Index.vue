<template>
  <q-page class="flex flex-center">
    <login v-if="!isLoggedIn" />
  </q-page>
</template>

<script>
import Login from 'src/components/Login.vue';
import { defineComponent } from 'vue';
import { useIsLoggedIn } from 'use/user';

export default defineComponent({
  name: 'PageIndex',
  components: { Login },
  setup() {
    return {
      ...useIsLoggedIn()
    }
  }
})
;
</script>
