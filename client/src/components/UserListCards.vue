<template lang="pug">
.row.q-col-gutter-lg.justify-evenly
  .col-md-3.col-sm-4.col-xs-6.col-lg-3(v-for='user in users', :key='user.id')
    user-card(:user='user', @select='selectHandler', :showHeader='total === 1')
      template(#header)
        tip-box.col(name='enter-opens-user')
</template>

<script>
import { defineComponent } from 'vue'
import TipBox from 'components/molecules/TipBox.vue'

import UserCard from 'components/UserCard.vue'

export default defineComponent({
  name: 'UserListCards',
  components: { UserCard, TipBox },
  props: {
    users: {
      type: Array,
      required: true,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    total: {
      type: Number,
      required: true,
    },
  },
  emits: ['select'],
  setup(_, { emit }) {
    function selectHandler(user) {
      emit('select', user)
    }
    return { selectHandler }
  },
})
</script>

<style lang="scss" scoped></style>
