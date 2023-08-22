<template>
  <q-img :srcset="srcset" :src="url" alt="User Avatar" />
</template>

<script lang="ts" setup>
import { useQuery } from '@vue/apollo-composable'
import { User, UserAvatarDocument } from 'src/generated/graphql'
import type { SetRequired } from 'type-fest'
import { computed } from 'vue'

interface Props {
  user: SetRequired<Partial<User>, 'id'>
}

const props = defineProps<Props>()

const { result } = useQuery(UserAvatarDocument, { id: props.user.id })
const url = computed(() =>
  result.value?.user?.avatar?.url
    ? result.value.user.avatar.url
    : '/id_placeholder.png'
)
const srcset = computed(() =>
  result.value?.user?.avatar?.srcset ? result.value.user.avatar.srcset : ''
)
</script>

<script lang="ts">
import { gql } from 'graphql-tag'

gql`
  query UserAvatar($id: ID!) {
    user(id: $id) {
      id
      avatar {
        srcset
        url
      }
    }
  }
`
</script>

<style lang="css"></style>
