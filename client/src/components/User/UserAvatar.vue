<template>
  <q-avatar>
    <UserImage :user="user" />
  </q-avatar>
</template>

<script setup lang="ts">
import type { UserImageFragment } from 'src/gql/graphql'

interface Props {
  user: UserImageFragment
}

defineProps<Props>()
</script>
