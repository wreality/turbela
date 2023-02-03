<template lang="pug">
.row.q-gutter-md
  .col
    search-input.col.bg-white(v-model='data', @keyup.enter='$emit("enterKey")')
  q-btn.bg-white(
    :class='btnClass',
    v-if='newLabel.length',
    :label='newLabel',
    icon='add_circle',
    @click='$emit("create")'
  )
</template>
<script setup lang="ts">
import { useVModel } from '@vueuse/core'
import SearchInput from './molecules/SearchInput.vue'

interface Props {
  modelValue: string
  newLabel?: string
  btnClass?: string
}
const props = withDefaults(defineProps<Props>(), {
  newLabel: '',
  btnClass: 'col-3',
})

interface Emits {
  (e: 'update:modelValue', value: string): void
  (e: 'enterKey'): void
  (e: 'create'): void
}
const emits = defineEmits<Emits>()

const data = useVModel(props)
</script>
