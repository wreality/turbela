<template lang="pug">
.justify-center.row.q-mt-lg
  .col-md-4
    q-card.bg-grey-2
      q-card-section.text-center
        q-icon(:name='props.icon', size='8rem', color='grey-9')
        .text-h6 {{ props.message }}
      q-separator(dark)
      q-card-actions
        q-btn(
          v-if='props.search.length',
          flat,
          icon='backspace',
          label='Clear Search',
          @click='$emit("clearSearch")'
        )
        q-btn(
          v-if='props.newLabel.length',
          flat,
          :label='props.newLabel',
          icon='add_circle',
          @click='$emit("addItem")'
        )
</template>

<script setup>
const emit = defineEmits(['addItem', 'clearSearch'])

const props = defineProps({
  search: {
    type: String,
    default: '',
  },
  message: {
    type: String,
    default: 'Search returned no results',
  },
  icon: {
    type: String,
    default: 'category',
  },
  newLabel: {
    type: String,
    default: '',
  },
})
</script>
