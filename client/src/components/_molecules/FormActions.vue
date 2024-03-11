<template>
  <div class="q-gutter-md">
    <template v-if="$slots.default">
      <slot></slot>
    </template>
    <template v-else>
      <q-btn
        :disabled="saveButton.disabled"
        :class="saveButton.classList"
        type="submit"
      >
        <q-icon v-if="saveButton.icon === 'check'" name="check"></q-icon>
        <q-spinner v-else-if="saveButton.icon === 'spinner'"></q-spinner>
        {{ $t('formActions.buttons.' + saveButton.text) }}
      </q-btn>
      <q-btn
        v-if="!resetBtn.disabled"
        class="bg-grey-4 ml-sm"
        @click="resetForm()"
      >
        {{ $t('formActions.buttons.discard') }}
      </q-btn>
    </template>
  </div>
</template>

<script setup lang="ts">
import { FormContextKey } from 'vee-validate'
import { computed, inject, reactive } from 'vue'

interface Emits {
  (e: 'saveClick'): void
}

defineEmits<Emits>()
const context = inject(FormContextKey)
if (!context) {
  throw Error('VeeValidate form not found')
}
const { meta, submitCount, isSubmitting, resetForm } = context

const saveButton = reactive({
  classList: computed((): string => {
    if (meta.value.dirty) {
      return 'bg-primary text-white'
    }
    if (submitCount.value) {
      return 'bg-positive text-white'
    }
    return 'bg-grey-3'
  }),
  text: computed(() => {
    if (isSubmitting.value) {
      return 'saving'
    }
    if (meta.value.dirty) {
      return 'save'
    }
    if (submitCount.value) {
      return 'saved'
    }
    return 'save'
  }),
  disabled: computed(() => {
    if (meta.value.dirty) {
      return false
    }
    if (submitCount.value) {
      return false
    }
    return true
  }),
  icon: computed(() => {
    if (isSubmitting.value) {
      return 'spinner'
    }
    if (submitCount.value) {
      return 'check'
    }
    return ''
  }),
})

const resetBtn = reactive({
  disabled: computed(() => {
    if (meta.value.dirty) {
      return false
    }
    return true
  }),
})
</script>
