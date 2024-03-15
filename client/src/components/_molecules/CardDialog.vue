<template>
  <q-card flat>
    <div class="column full-height">
      <template v-if="$slots['header']">
        <slot name="header" />
      </template>
      <CardHeader
        v-else-if="title"
        class="col-auto"
        :color="color"
        :title="title"
      />
      <div class="col">
        <slot />
      </div>
      <template v-if="$slots['actions']">
        <slot name="actions" />
      </template>
    </div>
  </q-card>
</template>

<script setup lang="ts">
interface Props {
  color?: string
  title?: string
}

defineProps<Props>()
</script>

<style scoped></style>
