<template>
  <Component
    :is="addressComponent"
    v-if="addressComponent"
    :initial-values="$props.initialValues"
    :verification-return="verificationReturn"
    @verify="gotoVerifyAddress"
    @manual="gotoManualAddress"
    @back="back"
    @use="useAddress"
  />
</template>

<script setup lang="ts">
import type { Address } from 'src/composables/gmaps'
import type { InferType } from 'yup'
import AutocompleteAddress from './Address/AutocompleteAddress.vue'
import ManualAddress from './Address/ManualAddress.vue'
import VerifyAddress from './Address/VerifyAddress.vue'

const addressComponent = shallowRef<Component | null>(null)
const { undo: back } = useRefHistory(addressComponent as Ref)

const schema = userSchema.pick(['address'])
type Schema = InferType<typeof schema>

const emit = defineEmits<{
  (e: 'continue', v: Schema): void
  (e: 'back'): void
}>()

interface Props {
  initialValues: Schema
}
defineProps<Props>()

const apiKey = ref<string | undefined>(undefined)
provide('mapsApiKey', apiKey)

onMounted(async () => {
  apiKey.value = await useSettingsSyncKey(SettingsKey.Admin, 'maps_api_key')
  if (apiKey.value) {
    addressComponent.value = AutocompleteAddress
  } else {
    addressComponent.value = ManualAddress
  }
})

function gotoManualAddress() {
  addressComponent.value = ManualAddress
}

const { verify } = useAddressVerification(apiKey)
const verificationReturn = ref<any>(null)
async function gotoVerifyAddress(value: Schema) {
  verificationReturn.value = await verify(value.address)
  if (!verificationReturn.value || verificationReturn.value.noIssues) {
    emit('continue', value)
    return
  }
  addressComponent.value = VerifyAddress
}

function useAddress(value: Address) {
  emit('continue', { address: value })
}
</script>
