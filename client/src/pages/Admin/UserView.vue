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
  email: string
}
const props = defineProps<Props>()

const { result } = useQuery(UserViewDocument, { email: props.email })
const user = computed(() => result.value?.user)
</script>

<style lang="scss" scoped></style>
