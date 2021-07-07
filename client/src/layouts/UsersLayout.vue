<template lang="pug">
router-view.q-pa-md(v-slot='{ Component }')
  keep-alive(include='UsersSearch')
    component(:is='Component')
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'UsersLayout',
  setup() {
    return {}
  },
})
</script>

<style lang="scss" scoped></style>
