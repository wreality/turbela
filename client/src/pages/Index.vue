<template>
  <q-page class="flex flex-center">
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
import { useIsLoggedIn } from 'use/user';

export default defineComponent({
  name: 'PageIndex',
  setup() {
    return {
      ...useIsLoggedIn()
    }
  }
})
;
</script>
