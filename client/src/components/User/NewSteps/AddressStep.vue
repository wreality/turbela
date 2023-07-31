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
import AutocompleteAddress from 'components/User/NewSteps/Address/AutocompleteAddress.vue'
import ManualAddress from 'components/User/NewSteps/Address/ManualAddress.vue'
import VerifyAddress from 'components/User/NewSteps/Address/VerifyAddress.vue'

import { useRefHistory } from '@vueuse/core'
import { Address, useAddressVerification } from 'src/composables/gmaps'
import { SettingsKey, useSettingsSyncKey } from 'src/composables/settings'
import type { Component } from 'vue'
import { onMounted, provide, ref, shallowRef } from 'vue'
const addressComponent = shallowRef<Component | null>(null)
const { undo: back } = useRefHistory(addressComponent)

import { userSchema } from 'src/composables/schemas'
import { InferType } from 'yup'

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
