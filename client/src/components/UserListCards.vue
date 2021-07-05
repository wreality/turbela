<template lang="pug">
.row.q-col-gutter-lg.justify-evenly
  .col-md-3.col-sm-4.col-xs-6.col-lg-3(v-for='user in users')
    q-skeleton(v-if='loading', style='height: 218px')
    q-card.user(v-else)
      q-card-section.text-center
        //ID Image
        avatar-image.q-mb-sm.q-mx-auto(
          square,
          rounded,
          size='100px',
          :user='user'
        )
        .text-bold {{ user.name }}
        .text-caption.ellipsis {{ user.email }}
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
    loading: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    return {}
  },
})
</script>

<style lang="scss" scoped></style>
