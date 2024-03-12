<template>
  <div style="display: none"></div>
</template>

<script setup lang="ts">
import BadgeCompletionUpdateDialog from 'src/components/_dialogs/BadgeCompletionUpdateDialog.vue'

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

const componentProps = computed(() => {
  if (userId) {
    return {
      userId: userId.value,
      badge: badge.value,
      revoke: true,
    }
  } else {
    return undefined
  }
})

useDialogPage(BadgeCompletionUpdateDialog, componentProps, {
  name: 'users:view:badges',
  params: { id: userId.value },
})
</script>
