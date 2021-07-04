<template lang="pug">
q-card.user(v-for='user in users')
  q-card-section.text-center
    //ID Image
    avatar-image.q-mb-sm.q-mx-auto(square, rounded, size='150px', :user='user')
    .text-bold {{ user.name }}
    .text-caption {{ user.email }}
  q-card-section.text-center.q-pa-sm.text-bold.bg-positive Current
</template>

<script>
import { defineComponent } from 'vue'
import AvatarImage from 'components/AvatarImage.vue'

export default defineComponent({
  name: 'UserListCards',
  components: { AvatarImage },
  props: {
    users: {
      type: Array,
      required: true,
    },
  },
  setup() {
    return {}
  },
})
</script>

<style lang="scss" scoped></style>
