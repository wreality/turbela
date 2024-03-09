<template>
  <q-item v-if="!loading && userObj">
    <q-item-section avatar>
      <UserAvatar :size="style.icon" :user="userObj" />
    </q-item-section>
    <q-item-section>
      <q-item-label :style="style.header">
        {{ userObj.name }}
      </q-item-label>
      <q-item-label v-if="user" :style="style.caption" caption>
        {{ userObj.email }}
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
import UserAvatar from './UserAvatar.vue'
import { computed, watchEffect } from 'vue'
import { graphql } from 'src/gql'
import { ResultOf } from '@graphql-typed-document-node/core'
import { useLazyQuery } from '@vue/apollo-composable'

const Fragment = graphql(`
  fragment UserItem on User {
    id
    name
    email
    ...UserImage
  }
`)

const Query = graphql(`
  query UserItem($id: ID!) {
    user(id: $id) {
      ...UserItem
    }
  }
`)

interface Props {
  user: ResultOf<typeof Fragment> | string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
})

const { result, loading, load } = useLazyQuery(Query, () => ({
  id: typeof props.user === 'string' ? props.user : props.user.id,
}))

watchEffect(() => {
  if (typeof props.user === 'string') {
    load()
  }
})

const userObj = computed(() => {
  if (typeof props.user === 'string') {
    return result.value?.user
  }
  return props.user
})

const style = computed(() => {
  const iconSizes = {
    xs: 28,
    sm: 36,
    md: 44,
    lg: 52,
    xl: 65,
  }
  const headerSizes = {
    xs: 10,
    sm: 12,
    md: 14,
    lg: 24,
    xl: 32,
  }

  const captionSizes = {
    xs: 8,
    sm: 12,
    md: 14,
    lg: 16,
    xl: 22,
  }

  return {
    header: { fontSize: `${headerSizes[props.size]}px` },
    caption: { fontSize: `${captionSizes[props.size]}px` },
    icon: iconSizes[props.size] + 'px',
  }
})
</script>

<style scoped></style>
