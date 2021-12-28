<template lang="pug">
q-list(bordered, separator)
  q-item(
    v-for='badge in badges',
    :key='badge.id',
    clickable,
    @click='selectHandler(badge)'
  )
    q-item-section {{ badge.name }}
</template>

<script>
import { defineComponent } from 'vue'
import TipBox from 'components/molecules/TipBox.vue'
import BadgeCard from './BadgeCard.vue'
import { onKeyStroke } from '@vueuse/core'
export default defineComponent({
  components: { TipBox, BadgeCard },
  props: {
    badges: {
      type: Array,
      required: true,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    total: {
      type: Number,
      required: true,
    },
  },
  emits: ['select'],
  setup(props, { emit }) {
    function selectHandler(badge) {
      emit('select', badge)
    }

    onKeyStroke('Enter', () => {
      if (props.badges.length === 1) {
        selectHandler(props.badges[0])
      }
    })
    return { selectHandler }
  },
})
</script>

<style lang="scss" scoped></style>
