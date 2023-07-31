<template>
  <q-input
    v-bind="$attrs"
    ref="inputRef"
    v-model="value"
    :error="errors.length !== 0"
    :label="t('label')"
    :hint="ot('hint')"
    :hide-bottom-space="!bottomSlots"
    :placeholder="ot('placeholder')"
    :autofocus="autofocus"
    outlined
    @clear="clearInput"
  >
    <template v-if="!hasErrorSlot" #error>
      <slot v-for="error in errors" :name="`error-${error}`">
        Default: {{ error }}
      </slot>
    </template>
    <template v-for="slotName in slots" #[slotName]>
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

const allSlots = useSlots() as unknown as QInputSlots
const hasErrorSlot = computed(() => !!allSlots.error)
const slots = computed(() => {
  const slotNames = Object.keys(allSlots)

  return slotNames.filter(
    (slotName: string) => !slotName.startsWith('error-')
  ) as Array<keyof QInputSlots>
})

const inputRef = ref<HTMLInputElement>()

function clearInput() {
  inputRef.value?.blur()
}

const nameRef = toRef(props, 'name')

const { ot, te, t } = usei18nPrefix(nameRef)
const { errors, value, meta } = useField<string>(nameRef, undefined)

const bottomSlots = computed(() => !!te('hint') || !meta.valid)
</script>
