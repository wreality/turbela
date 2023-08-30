<template>
  <q-img
    style="background: url('/id_placeholder.png');"
    :sizes="sizes"
    :srcset="srcset"
    :src="url"
    @load="onLoad"
    alt="User Avatar"
  />
</template>

<script lang="ts" setup>
import { useQuery } from '@vue/apollo-composable'
import { User, UserAvatarDocument } from 'src/generated/graphql'
import type { SetRequired } from 'type-fest'
import { computed, ref } from 'vue'

interface Props {
  user: SetRequired<Partial<User>, 'id'>
}

const props = defineProps<Props>()

const { result } = useQuery(UserAvatarDocument, { id: props.user.id })
const url = computed(() =>
  result.value?.user?.avatar?.url ?? ''
)
const srcset = computed(() =>
  result.value?.user?.avatar?.srcset ? result.value.user.avatar.srcset : ''
)

const loaded = ref(false);

function onLoad() {
  loaded.value = true;
}

const sizes = computed(() => {
  if (!loaded.value) {
    return '1px'
  }

  return '(max-width: 1200px) 60vw, 720px'
})
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
