<template>
  <badge-user-assign-dialog
    :badge-id="badgeId"
    :dismiss-route="{
      name: 'badges:view',
      params: { id: badgeId },
      replace: true,
    }"
  />
</template>

<script setup lang="ts">
definePage({
  name: 'badges:view:assign',
})

const route = useRoute('badges:view:assign')

const badgeId = computed(() => route.params.id)
</script>
