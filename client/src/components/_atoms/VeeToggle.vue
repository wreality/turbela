<template>
  <q-toggle
    v-bind="$attrs"
    v-model="value"
    :label="$t(fullKey('label'))"
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
import { usei18nPrefix } from 'src/composables/i18nPrefix'
import { useField } from 'vee-validate'
import { computed, ref, toRef, useSlots } from 'vue'

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
   * @see src/components/_atoms/VQWrap.vue
   */
  autofocus?: boolean
}

const props = withDefaults(defineProps<Props>(), { autofocus: false })

const slots = useSlots() as unknown as QInputSlots
const inputRef = ref<HTMLInputElement>()

const { fullKey } = usei18nPrefix()

function clearInput() {
  inputRef.value?.blur()
}

const nameRef = toRef(props, 'name')

const { t, te } = useI18n()
const labelRef = computed(() => {
  return t(fullKey('label'))
})
const { errors, value, meta } = useField<string>(nameRef, undefined)

const hint = computed(() => ot(fullKey('hint')))
const bottomSlots = computed(() => !!hint.value || !meta.valid)
function ot(key: string) {
  if (te(key)) {
    return t(key)
  }
  return undefined
}
</script>
