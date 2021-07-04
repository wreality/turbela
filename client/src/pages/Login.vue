<template lang="pug">
q-page.flex.flex-center
  q-card.my-card(style='width: 600px', flat, bordered)
    q-card-section(horizontal)
      q-img.col-4(src='https://cdn.quasar.dev/img/parallax2.jpg')
      q-card-section.col
        .flex.items-center.justify-center
        login-form.col-grow
</template>

<script>
import LoginForm from 'src/components/forms/LoginForm.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  components: { LoginForm },
  setup() {
    return {}
  },
})
</script>

<style lang="scss" scoped></style>
