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

<script>
import { defineComponent, ref, watch } from 'vue'

export default defineComponent({
  name: 'SearchInput',
  props: {
    modelValue: {
      type: String,
      default: '',
    },
  },
  emits: ['update:modelValue', 'keyup'],
  setup(_, { emit }) {
    const searchInput = ref(null)

    function focusSearch() {
      searchInput.value.focus()
    }

    function modelUpdate(newValue) {
      emit('update:modelValue', newValue)
    }

    function clearSearch() {
      emit('update:modelValue', '')
    }

    function keyup(...args) {
      emit('keyup', ...args)
    }

    watch(searchInput, (newValue) => {
      if (newValue) {
        focusSearch()
      }
    })

    return {
      searchInput,
      modelUpdate,
      clearSearch,
      keyup,
    }
  },
})
</script>

<style lang="scss" scoped></style>
