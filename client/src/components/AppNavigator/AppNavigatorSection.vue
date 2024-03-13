<template>
  <q-card-section
    class="row items-start q-col-gutter-sm q-pa-sm app-navigator-section"
  >
    <div class="text-bold full-width" :class="{ 'q-pa-none': !$props.label }">
      <slot name="header">{{ $props.label }}</slot>
    </div>
    <slot />
  </q-card-section>
</template>

<script setup lang="ts">
defineProps<{
  label?: string
}>()
</script>

<style scoped lang="scss">
.app-navigator-section {
  border-bottom: 1px solid $blue-2;
}
</style>
