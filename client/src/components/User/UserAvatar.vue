<template>
  <q-avatar>
    <UserImage :user="user" />
  </q-avatar>
</template>

<script setup lang="ts">
import { UserImageFragment } from 'src/gql/graphql'
import UserImage from './UserImage.vue'

interface Props {
  user: UserImageFragment
}

defineProps<Props>()
</script>
