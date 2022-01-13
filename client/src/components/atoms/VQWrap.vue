<template>
  <div>
    <slot />
  </div>
</template>

<script setup lang="ts">
import type { Validation } from '@vuelidate/core'
import type { MaybeRef } from '@vueuse/core'
import type { FormState } from 'src/composables/forms'
import { provide, toRef } from 'vue'

interface Props {
  /**
   * TPrefix to provide to VQInput components. When supplied, the VQInput component will use
   * the validator $path property to determine the translation key.
   */
  tPrefix?: string

  /**
   * Provide formState to VQInput components to allow inputs to adapt to form states.
   */
  formState?: MaybeRef<FormState>
}
const props = withDefaults(defineProps<Props>(), {
  tPrefix: '',
  formState: 'idle',
})

interface Emits {
  /**
   * VQInputs will emit their vqupdate events from this component instead of locally.
   */
  (e: 'vqupdate', validation: Validation, value: any): void
}
const emit = defineEmits<Emits>()

provide('tPrefix', props.tPrefix)
provide('formState', toRef(props, 'formState'))
provide('vqupdate', (validator: Validation, value: any) => {
  emit('vqupdate', validator, value)
})
</script>
