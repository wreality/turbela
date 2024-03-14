<template>
  <badge-completion-update-dialog
    :user-id="userId"
    :badge="badge"
    :revoke="true"
    :dismiss-route="{ name: 'users:view:badges', params: { id: userId } }"
  />
</template>

<script setup lang="ts">
import { Badge } from 'src/gql/graphql'

definePage({
  name: 'users:view:badges:revoke',
})

interface Props {
  badges: Badge[]
}

const props = defineProps<Props>()

const route = useRoute('users:view:badges:revoke')

const userId = computed(() => route.params.id)
const badge = computed(() =>
  props.badges?.find((b) => b.id === route.params.badgeId)
)
</script>
