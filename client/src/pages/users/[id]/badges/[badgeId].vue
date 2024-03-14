<template>
  <badge-completion-details-dialog
    :loading="loading"
    :completion="badgeCompletion as BadgeCompletion"
    :dismiss-route="{
      name: 'users:view:badges',
      params: { id: userId },
    }"
    header="badge"
  />
</template>

<script setup lang="ts">
import type { BadgeCompletion } from 'src/gql/graphql'

definePage({
  name: 'users:view:badges:view',
})

const route = useRoute('users:view:badges:view')

const userId = computed(() => route.params.id)
const badgeId = computed(() => route.params.badgeId)

const variables = computed(() => ({
  badgeId: badgeId.value,
  userId: userId.value,
}))

const { result, loading } = useQuery(GetUserBadgeCompletionDocument, variables)

const badgeCompletion = computed(() => result.value?.user?.badge.completion)
</script>

<style scoped></style>
