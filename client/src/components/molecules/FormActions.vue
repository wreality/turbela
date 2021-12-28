<template lang="pug">
q-page-sticky(v-show='visible', position='top-right')
  .bg-grey-1.q-ma-sm.q-pa-md.rounded-borders.shadow-15
    .q-gutter-md
      template(v-if='$slots.default')
        slot
      template(v-else)
        q-btn(
          :disabled='saveButton.disabled',
          :class='saveButton.classList',
          type='submit',
          @click='$emit("saveClick")'
        )
          q-icon(v-if='saveButton.icon === "check"', name='check')
          q-spinner(v-else-if='saveButton.icon === "spinner"')
          | {{ $t(saveButton.text) }}
        q-btn.bg-grey-4.ml-sm(
          v-if='!resetBtn.disabled',
          @click='$emit("resetClick")'
        )
          | {{ $t('buttons-discard-changes') }}
</template>

<script setup>
import { computed, reactive } from 'vue'

const props = defineProps({
  formState: {
    type: String,
    default: 'idle',
  },
})
defineEmits(['resetClick', 'saveClick'])

const saveButton = reactive({
  classList: computed(() => {
    return (
      {
        saved: 'bg-positive text-white',
        dirty: 'bg-primary text-white',
      }[props.formState] ?? 'bg-grey-3'
    )
  }),
  text: computed(() => {
    return (
      {
        saving: 'buttons-saving',
        saved: 'buttons-saved',
      }[props.formState] ?? 'buttons-save'
    )
  }),
  disabled: computed(() => {
    return (
      {
        saved: false,
        dirty: false,
      }[props.formState] ?? true
    )
  }),
  icon: computed(() => {
    return (
      {
        saved: 'check',
        saving: 'spinner',
      }[props.formState] ?? ''
    )
  }),
})

const resetBtn = reactive({
  disabled: computed(() => {
    return (
      {
        dirty: false,
      }[props.formState] ?? true
    )
  }),
})

const visible = computed(() => {
  return (
    {
      idle: false,
      loading: false,
    }[props.formState] ?? true
  )
})
</script>

<fluent locale="en">
buttons-save=Save
buttons-saved=Saved
buttons-saving=Saving

buttons-discard-changes=Discard Changes
  </fluent>
