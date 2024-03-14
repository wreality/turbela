<template>
  <badge-completion-update-dialog
    :user-id="userId"
    :dismiss-route="{
      name: 'users:view:badges',
      params: { id: userId },
      replace: true,
    }"
  />
</template>

<script setup lang="ts">
definePage({
  name: 'users:view:badges:assign',
})

const route = useRoute('users:view:badges:assign')

const userId = computed(() => route.params.id)
</script>
