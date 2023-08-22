<template>
  <q-avatar>
    <UserImage :user="props.user" />
  </q-avatar>
</template>

<script setup lang="ts">
import type { User } from 'src/generated/graphql'
import type { SetRequired } from 'type-fest'
import UserImage from './UserImage.vue'

interface Props {
  user: SetRequired<Partial<User>, 'id'>
}

const props = defineProps<Props>()
</script>
