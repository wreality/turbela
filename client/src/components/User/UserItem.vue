<template>
  <q-item>
    <q-item-section avatar>
      <UserAvatar :size="style.icon" :user="{ id: props.userId }" />
    </q-item-section>
    <q-item-section>
      <q-item-label
        v-if="user"
        :style="style.header"
      >
        {{ user.name }}
      </q-item-label>
      <q-item-label v-if="user" :style="style.caption" caption>
        {{ user.email }}
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
import UserAvatar from './UserAvatar.vue'
import { UserItemQueryDocument } from 'src/generated/graphql'
import { computed } from 'vue'
import { useQuery } from '@vue/apollo-composable'

interface Props {
  userId: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
})

const { result } = useQuery(UserItemQueryDocument, () => ({ id: props.userId }))

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

const user = computed(() => result.value?.user)
</script>

<script lang="ts">
import { gql } from 'graphql-tag'

gql`
  query UserItemQuery($id: ID!) {
    user(id: $id) {
      id
      name
      email
    }
  }
`
</script>

<style scoped></style>
