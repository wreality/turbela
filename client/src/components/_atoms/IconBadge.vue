<template>
  <q-badge size="large" :color="color" class="column">
    <q-icon class="block" size="md" :name="icon" />
    <div class="text-subtitle2"><slot /></div>
  </q-badge>
</template>

<script setup lang="ts">
interface Props {
  color: string
  icon: string
}

defineProps<Props>()
</script>

<style scoped></style>
