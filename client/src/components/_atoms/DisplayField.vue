<template>
  <div>
    <div class="column q-gutter-xs">
      <div class="text-weight-bold text-uppercase">{{ label }}</div>
      <div class="text-weight-light">
        <slot>
          {{ value }}
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  label: string
  value?: string
}

withDefaults(defineProps<Props>(), {
  value: '',
})
</script>

<style scoped></style>
