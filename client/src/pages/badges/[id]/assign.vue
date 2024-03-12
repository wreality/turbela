<template>
  <div style="display: none"></div>
</template>

<script setup lang="ts">
import BadgeUserAssignDialog from 'src/components/_dialogs/BadgeUserAssignDialog.vue'

definePage({
  name: 'badges:view:assign',
})

const route = useRoute('badges:view:assign')

const badgeId = computed(() => route.params.id)

useDialogPage(
  BadgeUserAssignDialog,
  { badgeId: badgeId.value },
  { name: 'badges:view', params: { id: badgeId.value } }
)
</script>
