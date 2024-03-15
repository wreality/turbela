<template>
  <div class="row q-gutter-md">
    <AddressDisplay
      :address="correctedAddress"
      :verification="result"
      label="Verification Result"
      @use="useCorrected"
      @back="backToInput"
    />
    <AddressDisplay
      :address="address"
      label="Input Address"
      @use="useOriginal"
    />
  </div>
</template>

<script setup lang="ts">
import type { Address, VerificationReturn } from 'src/composables/gmaps'

interface Props {
  verificationReturn: VerificationReturn
}

const props = defineProps<Props>()

const correctedAddress = computed(
  () => props.verificationReturn.correctedAddress
)
const result = computed(() => props.verificationReturn.result)

const address = computed(() => props.verificationReturn.address)

const emit = defineEmits<{
  (e: 'use', v: Address): void
  (e: 'back'): void
}>()

function useCorrected() {
  if (!correctedAddress.value) {
    return
  }
  emit('use', correctedAddress.value)
}

function useOriginal() {
  emit('use', address.value)
}

function backToInput() {
  emit('back')
}
</script>
