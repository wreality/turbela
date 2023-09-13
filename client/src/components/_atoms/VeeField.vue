<template>
  <q-field
    v-bind="$attrs"
    ref="inputRef"
    :label="t('label')"
    :hint="ot('hint')"
    outlined
    stack-label
  >
    <template v-for="slotName in slots" #[slotName]>
      <slot :name="slotName" />
    </template>
  </q-field>
</template>

<script setup lang="ts">
/**
 * Transparent wrapper for q-input that handles validation and translation by convention.
 *
 * @see https://v1.quasar.dev/vue-components/input#qinput-api
 */
import { QInputSlots } from 'quasar'
import { usei18nPrefix } from 'src/composables/i18nPrefix'
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
  tKey?: string
  autofocus?: boolean
}

const props = withDefaults(defineProps<Props>(), { tKey: '', autofocus: false })

const allSlots = useSlots() as unknown as QInputSlots
const slots = computed(() => {
  const slotNames = Object.keys(allSlots)

  return slotNames.filter(
    (slotName: string) => !slotName.startsWith('error-')
  ) as Array<keyof QInputSlots>
})

const inputRef = ref<HTMLInputElement>()

const nameRef = toRef(props, 'name')

const { ot, t } = usei18nPrefix(nameRef)
</script>
