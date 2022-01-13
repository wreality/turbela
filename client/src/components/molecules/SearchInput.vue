<template lang="pug">
q-input(
  :modelValue='modelValue',
  outlined,
  label='Search',
  icon='search',
  ref='searchInput',
  @update:modelValue='modelUpdate',
  @keyup='keyup'
)
  template(#prepend)
    q-icon(name='search')
  template(#append)
    q-btn(icon='backspace', flat, @click='clearSearch')
</template>

<script lang="ts" setup>
import { defineComponent, ref, watch } from 'vue'

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
