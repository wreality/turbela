<template>
  <q-img :srcset="srcset" :src="url" alt="User Avatar" />
</template>

<script lang="ts" setup>
import { useQuery } from '@vue/apollo-composable'
import { User, UserAvatarDocument } from 'src/generated/graphql'
import type { SetRequired } from 'type-fest'
import { computed } from 'vue'
const stringToHashInt = (s: string): number => {
  var hash = 0,
    i,
    chr
  if (s.length === 0) return hash
  for (i = 0; i < s.length; i++) {
    chr = s.charCodeAt(i)
    hash = (hash << 5) - hash + chr
    hash |= 0 // Convert to 32bit integer
  }
  return hash
}
interface Props {
  user: SetRequired<Partial<User>, 'id' | 'email'>
}

const props = defineProps<Props>()

const avatarSrc = computed(() => {
  if (!props.user.email) {
    return ''
  }
  const number = Math.abs(stringToHashInt(props.user.email)) % 8

  return `avatar-${number}.jfif`
})

const { result } = useQuery(UserAvatarDocument, { id: props.user.id })
const url = computed(() =>
  result.value?.user?.avatar?.url
    ? result.value.user.avatar.url
    : avatarSrc.value
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
