<template>
  <q-input
    v-bind="$attrs"
    ref="inputRef"
    v-model="value"
    :error="errors.length !== 0"
    :label="$t(fullKey('label'))"
    :hint="hint"
    :hide-bottom-space="!bottomSlots"
    :placeholder="ot(fullKey('placeholder'))"
    :autofocus="autofocus"
    outlined
    @clear="clearInput"
  >
    <template v-if="!slots.error" #error>
      {{ errors.join(',') }}
    </template>
    <template v-for="(_, slotName) in slots" #[slotName]>
      <slot :name="slotName" />
    </template>
  </q-input>
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
   * VeeValidator name the input should use.
   */
  name: string
  /**
   * Translation key for label, hint and error messages.
   * VQWrap can also provide a tPrefix, allowing the component to use validation path to compute translation key.
   *
   * @see src/components/_atoms/VQWrap.vue
   */
  t?: string
  autofocus?: boolean
}

const props = withDefaults(defineProps<Props>(), { t: '', autofocus: false })

const slots = useSlots() as unknown as QInputSlots
const inputRef = ref<HTMLInputElement>()

const { fullKey: prefixKey } = usei18nPrefix()
const fullKey = (key: string) => prefixKey(`${props.name}.${key}`)
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
