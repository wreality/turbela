<template lang="pug">
ul
  li(v-for='error in props.errors', :key='error.$validator')
    | {{ $t(`${prefix}-${getErrorMessageKey(error)}`) }}
</template>

<script setup>
import { getErrorMessageKey } from 'src/use/validationHelpers'
const props = defineProps({
  errors: {
    type: Array,
    required: true,
  },
  prefix: {
    type: String,
    required: false,
    default: '',
  },
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
