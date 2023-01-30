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
          v-if='!resetBtn.disabled && !props.isNew',
          @click='$emit("resetClick")'
        )
          | {{ $t('formActions.buttons.discard') }}
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue'

import { ALL_STATES } from 'src/composables/forms'
import type { FormState } from 'src/composables/forms'

interface Props {
  formState?: FormState
  isNew?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  formState: 'idle',
  isNew: false,
})

interface Emits {
  (e: 'resetClick'): void
  (e: 'saveClick'): void
}

defineEmits<Emits>()

const statesObj = ALL_STATES.reduce((o: any, i: FormState) => {
  o[i] = undefined
  return o
}, {})

const saveButton = reactive({
  classList: computed((): string => {
    return (
      {
        ...statesObj,
        saved: 'bg-positive text-white',
        dirty: 'bg-primary text-white',
      }[props.formState] ?? 'bg-grey-3'
    )
  }),
  text: computed(() => {
    return (
      'formActions.buttons.' +
      ({
        ...statesObj,
        saving: 'saving',
        saved: 'saved',
      }[props.formState] ?? 'save')
    )
  }),
  disabled: computed(() => {
    return (
      {
        ...statesObj,
        saved: false,
        dirty: false,
      }[props.formState] ?? true
    )
  }),
  icon: computed(() => {
    return (
      {
        ...statesObj,
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
        ...statesObj,
        dirty: false,
      }[props.formState] ?? true
    )
  }),
})

const visible = computed(() => {
  return (
    {
      ...statesObj,
      idle: false,
      loading: false,
    }[props.formState] ?? true
  )
})
</script>
