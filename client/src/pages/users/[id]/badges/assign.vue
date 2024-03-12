<template>
  <div style="display: none"></div>
</template>

<script setup lang="ts">
import BadgeCompletionUpdateDialog from 'src/components/_dialogs/BadgeCompletionUpdateDialog.vue'

definePage({
  name: 'users:view:badges:assign',
})

const route = useRoute('users:view:badges:assign')

const userId = computed(() => route.params.id)

const componentProps = computed(() => {
  if (userId) {
    return {
      userId: userId.value,
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
