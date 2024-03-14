<template>
  <badge-completion-details-dialog
    header="user"
    :loading="loading"
    :completion="badgeCompletion as BadgeCompletion"
    :dismiss-route="{
      name: 'badges:view',
      params: { id: badgeId },
      replace: true,
    }"
  />
</template>

<script setup lang="ts">
import type { BadgeCompletion } from 'src/gql/graphql'

definePage({
  name: 'badges:view:user',
})

const route = useRoute('badges:view:user')

const badgeId = computed(() => route.params.id)
const variables = computed(() => ({
  badgeId: badgeId.value,
  userId: route.params.userId,
}))

const { result, loading } = useQuery(GetUserBadgeCompletionDocument, variables)

const badgeCompletion = computed(() => result.value?.user?.badge?.completion)
</script>

<script lang="ts">
graphql(`
  query GetUserBadgeCompletion($badgeId: ID!, $userId: ID!) {
    user(id: $userId) {
      id
      badge(id: $badgeId) {
        id
        completion {
          ...BadgeCompletionDetails
        }
      }
    }
  }
`)
</script>
