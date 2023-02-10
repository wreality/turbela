<template>
  <div class="row q-gutter-md">
    <div class="col">
      <search-input
        v-model="data"
        class="col bg-white"
        @keyup.enter="$emit('enterKey')"
      ></search-input>
    </div>
    <q-btn
      v-if="newLabel.length"
      class="bg-white"
      :class="btnClass"
      :label="newLabel"
      icon="add_circle"
      @click="$emit('create')"
    ></q-btn>
  </div>
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
