<template lang="pug">
q-card
  q-card-section.q-pa-sm.column(:class='props.topClass')
    q-card-section.q-pa-none
      slot(name='header')
    q-card-section.q-pa-none.items-center(v-if='slots.details')
      slot(name='details')
  template(v-if='slots.actions')
    q-separator
    q-card-actions.q-py-xs
      slot(name='actions')
</template>

<script setup lang="ts">
import { useSlots } from 'vue'

interface Props {
  /**
   * Class to be applied to the outermost q-card-section
   */
  topClass?: any
}

const props = withDefaults(defineProps<Props>(), {
  topClass: '',
})

const slots = useSlots()
</script>
