<template>
  <div style="display: none"></div>
</template>

<script setup lang="ts">
import BadgeCompletionDetailsDialog from 'src/components/_dialogs/BadgeCompletionDetailsDialog.vue'
import type { User } from 'src/gql/graphql'

interface Props {
  users: User[]
}

definePage({
  name: 'badges:view:user',
})

const props = defineProps<Props>()
const route = useRoute('badges:view:user')

const badgeId = computed(() => route.params.id)
const badgeCompletion = computed(
  () =>
    props.users.find((c) => c.email === decodeURIComponent(route.params.userId))
      ?.completion
)

const componentProps = computed(() => {
  if (badgeCompletion.value) {
    return {
      badgeCompletion: badgeCompletion.value,
      header: 'user',
    }
  } else {
    return undefined
  }
})

useDialogPage(BadgeCompletionDetailsDialog, componentProps, {
  name: 'badges:view',
  params: { id: badgeId.value },
})
</script>
