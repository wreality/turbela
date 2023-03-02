<template>
  <q-toggle
    v-bind="$attrs"
    v-model="value"
    :label="$t(fullTKey('label'))"
    :hint="hint"
  >
    <template v-for="(_, slotName) in slots" #[slotName]>
      <slot :name="slotName" />
    </template>
  </q-toggle>
</template>

<script setup lang="ts">
/**
 * Transparent wrapper for q-input that handles validation and translation by convention.
 *
 * @see https://v1.quasar.dev/vue-components/input#qinput-api
 */
import { QInputSlots } from 'quasar'
import { useField } from 'vee-validate'
import { computed, inject, ref, toRef, useSlots } from 'vue'

import { useI18n } from 'vue-i18n'

interface Props {
  /**
   * VeeValidate name the input should use.
   */
  name: string
  /**
   * Translation key for label, hint and error messages.
   * VQWrap can also provide a tPrefix, allowing the component to use validation path to compute translation key.
   *
   * @see src/components/atoms/VQWrap.vue
   */
  t?: string
  autofocus?: boolean
}

const props = withDefaults(defineProps<Props>(), { t: '', autofocus: false })

const slots = useSlots() as unknown as QInputSlots
const inputRef = ref<HTMLInputElement>()

const parentTPrefix = inject<string>('tPrefix', '')
const tPrefix = computed(() => {
  if (props.t.length > 0) {
    return props.t
  }
  return `${parentTPrefix}.${props.name}`
})

/**
 * Provide full translation key for a field.
 */
const fullTKey = (key: string) => {
  return `${tPrefix.value}.${key}`.replace(/\[[\d+]\]/g, '')
}

function clearInput() {
  inputRef.value?.blur()
}

const nameRef = toRef(props, 'name')

const { t, te } = useI18n()
const labelRef = computed(() => {
  return t(`${tPrefix.value}.label`)
})
const { errors, value, meta } = useField<string>(nameRef, undefined)

const hint = computed(() => ot(`${tPrefix.value}.hint`))
const bottomSlots = computed(() => !!hint.value || !meta.valid)
function ot(key: string) {
  if (te(key)) {
    return t(key)
  }
  return undefined
}
</script>
