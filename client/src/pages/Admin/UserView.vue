<template lang="pug">
div
  .q-mb-md
    q-btn(label='Back to search', to='/admin/users')
  .flex.justify-left(v-if='user')
    user-card(:user='user')
</template>

<script setup lang="ts">
import { useQuery, useResult } from '@vue/apollo-composable'
import UserCard from 'components/UserCard.vue'
import { UserViewDocument } from 'src/generated/graphql'

interface Props {
  email: string
}
const props = defineProps<Props>()

const { result } = useQuery(UserViewDocument, { email: props.email })
const user = useResult(result)
</script>

<style lang="scss" scoped></style>
