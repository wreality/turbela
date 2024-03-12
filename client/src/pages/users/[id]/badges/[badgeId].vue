<template>
  <div style="display: none"></div>
</template>

<script setup lang="ts">
import BadgeCompletionDetailsDialog from 'src/components/_dialogs/BadgeCompletionDetailsDialog.vue'
import type { Badge } from 'src/gql/graphql'

interface Props {
  badges?: Badge[]
}

definePage({
  name: 'users:view:badges:view',
})

const props = defineProps<Props>()
const route = useRoute('users:view:badges:view')

const userId = computed(() => route.params.id)
const badgeCompletion = computed(
  () => props.badges?.find((b) => b.id === route.params.badgeId)?.completion
)

const componentProps = computed(() => {
  if (badgeCompletion.value) {
    return {
      badgeCompletion: badgeCompletion.value,
      header: 'badge',
    }
  } else {
    return undefined
  }
})

useDialogPage(BadgeCompletionDetailsDialog, componentProps, {
  name: 'users:view:badges',
  params: { id: userId.value },
})
</script>

<style scoped></style>
