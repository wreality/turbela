<template>
  <q-select
    v-bind="$attrs"
    ref="selectRef"
    v-model="value"
    :error="errors.length !== 0"
    :label="t('label')"
    :hint="ot('hint')"
    :hide-bottom-space="!bottomSlots"
    :placeholder="ot('placeholder')"
    :autofocus="autofocus"
    outlined
  >
    <template v-if="!slots.error" #error>
      {{ errors.join(',') }}
    </template>

    <template
      v-for="(_, slot) in slots"
      #[slot]="//@ts-ignore
    scope"
    >
      <slot :name="slot" v-bind="scope || {}" />
    </template>
  </q-select>
</template>

<script setup lang="ts">
/**
 * Transparent wrapper for q-input that handles validation and translation by convention.
 *
 * @see https://v1.quasar.dev/vue-components/input#qinput-api
 */
import { QInputSlots, QSelect } from 'quasar'
import { usei18nPrefix } from 'src/composables/i18nPrefix'
import { useField } from 'vee-validate'
import { computed, ref, toRef, useSlots } from 'vue'

interface Props {
  /**
   * Vuelidate validator object the input should use.
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

const props = withDefaults(defineProps<Props>(), {
  tKey: '',
  autofocus: false,
})

const slots = useSlots() as unknown as QInputSlots
const selectRef = ref<InstanceType<typeof QSelect> | null>()

defineExpose({
  selectRef,
})

const nameRef = toRef(props, 'name')
const { ot, te, t } = usei18nPrefix(nameRef as unknown as string)
const { errors, value, meta } = useField<string>(
  nameRef as unknown as string,
  undefined
)

const bottomSlots = computed(() => !!te('hint') || !meta.valid)
</script>
