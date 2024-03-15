<template>
  <q-toggle
    v-bind="$attrs"
    v-model="value"
    :label="t('label')"
    :hint="hint"
    :bottom-slots="bottomSlots"
  >
    <template
      v-for="(_, slotName) in slots"
      #[slotName]="//@ts-ignore
    data"
    >
      <slot :name="slotName" v-bind="data" />
    </template>
  </q-toggle>
</template>

<script setup lang="ts">
/**
 * Transparent wrapper for q-input that handles validation and translation by convention.
 *
 * @see https://v1.quasar.dev/vue-components/input#qinput-api
 */
import type { QInputSlots } from 'quasar'

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

const { t, ot } = usei18nPrefix()

const nameRef = toRef(props, 'name')

const { value, meta } = useField<string>(nameRef, undefined)

const hint = computed(() => ot('hint'))
const bottomSlots = computed(() => !!hint.value || !meta.valid)
</script>
