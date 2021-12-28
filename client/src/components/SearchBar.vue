<template lang="pug">
.row.q-gutter-md
  .col
    search-input.col(v-model='data', @keyup.enter='$emit("enterKey")')
  q-btn(
    :class='btnClass',
    v-if='newLabel.length',
    :label='newLabel',
    icon='add_circle',
    @click='$emit("create")'
  )
</template>
<script setup>
import { useVModel } from '@vueuse/core'
import SearchInput from './molecules/SearchInput.vue'
const props = defineProps({
  search: {
    type: String,
    required: true,
  },
  newLabel: {
    type: String,
    default: '',
  },
  btnClass: {
    type: String,
    default: 'col-3',
    required: false,
  },
})

const emits = defineEmits(['update:search', 'enterKey', 'create'])
const data = useVModel(props, 'search', emits)
</script>
