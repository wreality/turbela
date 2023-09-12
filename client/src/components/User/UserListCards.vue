<template>
  <div class="row q-col-gutter-lg justify-evenly">
    <div
      v-for="user in users"
      :key="user.id"
      class="col-md-3 col-sm-4 col-xs-6 col-lg-3"
    >
      <UserCard :user="user" :show-header="total === 1" @select="selectHandler">
        <template #header>
          <tip-box class="col" name="enter-opens-user"></tip-box>
        </template>
      </UserCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onKeyStroke } from '@vueuse/core'
import UserCard from 'src/components/User/UserCard.vue'
import TipBox from 'src/components/_molecules/TipBox.vue'
import type { User } from 'src/gql/graphql'

interface Props {
  users: Array<User>
  loading?: boolean
  total: number
}
const props = withDefaults(defineProps<Props>(), {
  loading: false,
})

interface Emits {
  (e: 'select', value: User): void
}

const emit = defineEmits<Emits>()

function selectHandler(user: User) {
  emit('select', user)
}

onKeyStroke('Enter', () => {
  if (props.users.length === 1) {
    selectHandler(props.users[0])
  }
})
</script>

<style lang="scss" scoped></style>
