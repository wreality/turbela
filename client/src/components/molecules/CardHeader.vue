<template>
  <q-card-section :class="classes">
    <slot v-if="$slots['default']" />
    <template v-else-if="title">{{ title }}</template>
  </q-card-section>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  color?: string
  title?: string
}

const props = defineProps<Props>()

const classes = computed(() => {
  return [
    'q-py-sm',
    props.color ? 'bg-' + props.color : 'bg-primary',
    'text-white',
  ]
})
</script>

<style scoped></style>
