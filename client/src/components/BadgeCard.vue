<template lang="pug">
q-card.user.cursor-pointer(@click='clickHandler')
  transition(
    appear,
    enter-active-class='animated flipInX animate__slow animate__delay-2s'
  )
    q-card-section.q-pa-none.absolute(
      v-if='showHeader',
      style='z-index: 100; width: 100%'
    )
      slot(name='header')
  q-card-section.text-center.badge-card-body
    .text-bold {{ badge.name }}
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    badge: {
      type: Object,
      required: true,
    },
    showHeader: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['select'],
  setup(props, { emit }) {
    function clickHandler() {
      emit('select', props.badge)
    }
    return { clickHandler }
  },
})
</script>

<style lang="scss" scoped>
.badge-card-body {
  padding-top: 4em;
}
</style>
