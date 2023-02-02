<template lang="pug">
div
  .q-mb-md
    q-btn(label='Back to search', to='/admin/users')
  .flex.justify-left(v-if='user')
    UserCard(:user='user')
</template>

<script setup lang="ts">
import { useQuery } from '@vue/apollo-composable'
import UserCard from 'components/UserCard.vue'
import { QBtn } from 'quasar'
import { UserViewDocument } from 'src/generated/graphql'
import { computed } from 'vue'

interface Props {
  id: string
}
const props = defineProps<Props>()

const { result } = useQuery(UserViewDocument, { id: props.id })
const user = computed(() => result.value?.user)
</script>

<script lang="ts">
import { gql } from 'graphql-tag'
gql`
  query UserView($id: ID, $email: String) {
    user(id: $id, email: $email) {
      email
      name
      id
    }
  }
`
</script>

<style lang="scss" scoped></style>
