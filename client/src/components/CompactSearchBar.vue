<template>
  <div class="row">
    <search-input
      v-model="data"
      class="col"
      style="flex-grow: 4"
      @keyup.enter="$emit('enterKey')"
    ></search-input>
    <q-btn
      v-if="newLabel.length"
      class="col"
      :label="newLabel"
      icon="add_circle"
      style="flex-grow: 1"
      @click="$emit('create')"
    ></q-btn>
  </div>
</template>
<script setup lang="ts">
import { useVModel } from '@vueuse/core'
import SearchInput from 'components/_molecules/SearchInput.vue'

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
