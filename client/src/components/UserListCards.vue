<template lang="pug">
.row.q-col-gutter-lg.justify-evenly
  .col-md-3.col-sm-4.col-xs-6.col-lg-3(v-for='user in users', :key='user.id')
    UserCard(:user='user', @select='selectHandler', :showHeader='total === 1')
      template(#header)
        tip-box.col(name='enter-opens-user')
</template>

<script setup lang="ts">
import TipBox from 'components/molecules/TipBox.vue'
import UserCard from 'components/UserCard.vue'
import { onKeyStroke } from '@vueuse/core'
import type { User } from 'src/generated/graphql'

interface Props {
  users: Array<User>
  loading?: boolean
  total: number
}
const props = withDefaults(defineProps<Props>(), {
  loading: false,
})

interface Emits {
  (e: 'select', value: Pick<User, 'id'>): void
}

const emit = defineEmits<Emits>()

function selectHandler(user: Pick<User, 'id'>) {
  emit('select', user)
}

onKeyStroke('Enter', () => {
  if (props.users.length === 1) {
    selectHandler(props.users[0])
  }
})
</script>

<style lang="scss" scoped></style>
