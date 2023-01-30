<template>
  <div v-if="formState === 'loading'" :class="$attrs.class">
    <q-skeleton type="QInput" class="q-mb-md" />
  </div>
  <q-input
    v-else
    v-bind="$attrs"
    ref="inputRef"
    v-model="model"
    :error="v.$error"
    :label="$t(fullTKey('label'))"
    :hint="$t(fullTKey('hint'))"
    :placeholder="$t(fullTKey('placeholder'))"
    outlined
    @clear="clearInput"
  >
    <template v-if="!slots.error" #error>
      <error-field-renderer :errors="v.$errors" :prefix="`${tPrefix}.errors`" />
    </template>
    <template v-for="(_, name) in slots" #[name]>
      <slot :name="name" />
    </template>
  </q-input>
</template>

<script setup lang="ts">
/**
 * Transparent wrapper for q-input that handles validation and translation by convention.
 *
 * @see https://v1.quasar.dev/vue-components/input#qinput-api
 */
import { computed, inject, ref, useSlots } from 'vue'
import type { Ref } from 'vue'
import type { QInputSlots } from 'quasar'
import type { FormState } from 'src/composables/forms'
import type { Validation } from '@vuelidate/core'
import ErrorFieldRenderer from 'src/components/molecules/ErrorFieldRenderer.vue'

interface Props {
  /**
   * Vuelidate validator object the input should use.
   */
  v: Validation<any, any> | any
  /**
   * Translation key for label, hint and error messages.
   * VQWrap can also provide a tPrefix, allowing the component to use validation path to compute translation key.
   *
   * @see src/components/atoms/VQWrap.vue
   */
  t?: string
}

const props = withDefaults(defineProps<Props>(), { t: '' })

interface Emits {
  (e: 'vqupdate', v: Validation, value: string): void
}

interface ParentUpdateHandler {
  (v: Validation<any, any>, value: any): void
}
const emit = defineEmits<Emits>()

const slots = useSlots() as unknown as QInputSlots
const parentUpdater = inject<ParentUpdateHandler | null>('vqupdate', null)
const inputRef = ref<HTMLInputElement>()
const model = computed({
  get() {
    return props.v.$model
  },
  set(newValue: string) {
    const value = newValue !== null ? newValue : ''
    if (parentUpdater) {
      parentUpdater(props.v, value)
    } else {
      /**
       * Emits any update to the underlying input.  Parent component is responsible for updateing the validation model.
       *
       * @param Object validator
       * @param value New value for input
       * @event vqupdate
       * @see src/components/atoms/VQWrap.vue
       */
      emit('vqupdate', props.v, value)
    }
  },
})

const parentTPrefix = inject<string>('tPrefix', '')
const tPrefix = computed(() => {
  if (props.t.length > 0) {
    return props.t
  }
  return `${parentTPrefix}.${props.v.$path}`
})

/**
 * Provide full translation key for a field.
 */
const fullTKey = (key: string) => {
  return `${tPrefix.value}.${key}`
}

function clearInput() {
  inputRef.value?.blur()
}
const formState = inject<Ref<FormState>>('formState', ref('idle'))
</script>
