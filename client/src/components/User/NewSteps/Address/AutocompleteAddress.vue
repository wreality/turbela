<template>
  <q-form class="column q-gutter-sm">
    <VeeSelect
      ref="veeRef"
      name="addressAutocomplete"
      autofocus
      use-input
      :options="suggestions"
      fill-input
      option-value="place_id"
      option-label="description"
      hide-selected
      @update:model-value="selected"
      @filter="filterFn"
    >
      <template #prepend>
        <q-icon name="search" />
      </template>
      <template #option="{ opt, itemProps }">
        <q-item v-bind="itemProps">
          <q-item-section v-if="!opt.place_id" avatar>
            <q-avatar dense icon="keyboard" />
          </q-item-section>
          <q-item-section v-if="opt.place_id">
            <q-item-label>
              {{ opt.structured_formatting.main_text }}
            </q-item-label>
            <q-item-label caption>
              {{ opt.structured_formatting.secondary_text }}
            </q-item-label>
          </q-item-section>
          <q-item-section v-else>
            <q-item-label>Can't find the correct address?</q-item-label>
            <q-item-label caption
              >Select to enter the address parts manually.</q-item-label
            >
          </q-item-section>
        </q-item>
      </template>
    </VeeSelect>
    <div>
      <q-img
        src="/vendor/google_on_white.png"
        style="width: 59px; height: 18px"
      />
    </div>
    <div ref="attributionsRef">Attributions</div>
  </q-form>
</template>

<script setup lang="ts">
import { toValue } from '@vueuse/core'
import VeeSelect from 'src/components/_atoms/VeeSelect.vue'
import type { Address, Suggestion } from 'src/composables/gmaps'
import { useAddressSuggestions } from 'src/composables/gmaps'
import { useForm } from 'vee-validate'
import type { Ref } from 'vue'
import { inject, onMounted, ref } from 'vue'

type Schema = {
  address: {
    city: string
    state: string
    postal_code: string
    line1: string
    line2: string
  }
}
interface Props {
  initialValues: Schema
}
const props = defineProps<Props>()
useForm()

const attributionsRef = ref<HTMLDivElement | null>(null)
const veeRef = ref<InstanceType<typeof VeeSelect> | null>(null)
const emit = defineEmits<{
  (e: 'verify', value: Schema): void
  (e: 'manual'): void
}>()

const apiKey = inject<Ref<string>>('mapsApiKey') ?? ''
const { filterFn, suggestions, selectPlace } = useAddressSuggestions(
  attributionsRef,
  {
    apiKey: toValue(apiKey),
  }
)

onMounted(() => {
  const address = props.initialValues.address
  const singleLine = (address: Address) =>
    `${address.line1} ${address.line2} ${address.city} ${address.state} ${address.postal_code}`.trim()
  const singleLineAddress = singleLine(address)
  if (singleLineAddress.length > 0) {
    veeRef.value?.selectRef?.updateInputValue(singleLineAddress)
  }
})

async function selected(value: Suggestion) {
  if (!value.place_id) {
    emit('manual')
    return
  }

  try {
    const address = await selectPlace(value.place_id)
    emit('verify', { address })
  } catch (e) {
    console.error(e)
    return
  }
}
</script>
