<template lang="pug">
.col
  q-btn.text-center.setting-icon(
    :color='!to ? "grey-5" : variant',
    :outline='!to',
    :icon='icon',
    :label='title',
    :to='to',
    stack
  )
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'SetupGridIcon',
  props: {
    to: {
      type: [Object, String],
      default: '',
    },
    variant: {
      type: String,
      default: 'secondary',
    },
    icon: {
      type: String,
      default: 'question',
    },
    title: {
      type: String,
      default: '',
      required: true,
    },
  },
  setup() {
    return {}
  },
})
</script>

<style lang="scss">
.setting-icon {
  width: 150px;
  height: 120px;
  .q-icon {
    font-size: 3rem;
  }
}
</style>
