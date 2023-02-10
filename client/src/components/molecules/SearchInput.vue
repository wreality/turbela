<template>
  <q-input
    ref="searchInput"
    :model-value="modelValue"
    outlined
    label="Search"
    icon="search"
    @update:model-value="modelUpdate"
    @keyup="keyup"
  >
    <template #prepend>
      <q-icon name="search"></q-icon>
    </template>
    <template #append>
      <q-btn icon="backspace" flat @click="clearSearch"></q-btn>
    </template>
  </q-input>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'

interface Props {
  modelValue: string
}

defineProps<Props>()

interface Emits {
  (e: 'update:modelValue', value: string | number | null): void
  (e: 'keyup', ...args: any[]): void
}
const emit = defineEmits<Emits>()

const searchInput = ref<HTMLInputElement>()

function focusSearch() {
  searchInput.value?.focus()
}

function modelUpdate(newValue: string | number | null) {
  emit('update:modelValue', newValue)
}

function clearSearch() {
  emit('update:modelValue', '')
}

function keyup(...args: any) {
  emit('keyup', ...args)
}

watch(searchInput, (newValue) => {
  if (newValue) {
    focusSearch()
  }
})
</script>
