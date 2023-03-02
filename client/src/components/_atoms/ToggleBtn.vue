<template>
  <q-btn
    :unelevated="props.modelValue"
    :color="props.modelValue ? 'secondary' : undefined"
    @click="toggle"
  />
</template>

<script setup lang="ts">
interface Props {
  modelValue: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

function toggle() {
  emit('update:modelValue', !props.modelValue)
}
</script>
