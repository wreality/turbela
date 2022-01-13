<template lang="pug">
.row
  search-input.col(
    v-model='data',
    @keyup.enter='$emit("enterKey")',
    style='flex-grow: 4'
  )
  q-btn.col(
    v-if='newLabel.length',
    :label='newLabel',
    icon='add_circle',
    @click='$emit("create")',
    style='flex-grow: 1'
  )
</template>
<script setup lang="ts">
import { useVModel } from '@vueuse/core'
import SearchInput from './molecules/SearchInput.vue'

interface Props {
  search: string
  newLabel?: string
}

const props = withDefaults(defineProps<Props>(), {
  newLabel: '',
})

interface Emits {
  (e: 'update:search', value: string): void
  (e: 'enterKey'): void
  (e: 'create'): void
}
const emits = defineEmits<Emits>()

const data = useVModel(props, 'search', emits)
</script>
