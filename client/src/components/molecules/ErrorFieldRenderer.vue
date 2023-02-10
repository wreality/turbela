<template>
  <ul>
    <li v-for="error in props.errors" :key="error.$validator">
      {{ $t(`${prefix}.${getErrorMessageKey(error)}`) }}
    </li>
  </ul>
</template>

<script setup lang="ts">
import { getErrorMessageKey } from 'src/composables/validationHelpers'
import type { ErrorObject } from '@vuelidate/core'

interface Props {
  errors: Array<ErrorObject>
  prefix?: string
}

const props = withDefaults(defineProps<Props>(), {
  error: () => [],
  prefix: '',
})
</script>

<style scoped>
li {
  display: block;
}
ul {
  margin-block: 0;
  padding-inline: 0;
}
</style>
