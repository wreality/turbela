<template lang="pug">
ul
  li(v-for='error in errors', :key='error.$validator')
    | {{ $t(`${prefix}.${getErrorMessageKey(error)}`) }}
</template>

<script>
import { getErrorMessageKey } from 'src/use/validationHelpers'
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'ErrorFieldRenderer',
  props: {
    errors: {
      type: Array,
      required: true,
    },
    prefix: {
      type: String,
      required: false,
      default: '',
    },
  },
  setup() {
    return { getErrorMessageKey }
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
