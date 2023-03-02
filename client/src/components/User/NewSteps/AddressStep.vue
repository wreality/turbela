<template>
  <q-form v-show="!result" class="column q-gutter-sm" @submit="continueBtn">
    <TipBox v-if="!verificationEnabled" name="enable-address-verification" />
    <VeeInput name="address.line1" autofocus />
    <VeeInput name="address.line2" />
    <div>
      <div class="row q-col-gutter-md">
        <VeeInput name="address.city" class="col-xs-12 col-md-5" />
        <VeeSelect
          :options="usStates"
          name="address.state"
          class="col-xs-12 col-md-3"
          emit-value
        />
        <VeeInput name="address.postal_code" class="col-xs-12 col-md-4" />
      </div>
    </div>
    <q-stepper-navigation class="q-gutter-md">
      <q-btn color="primary" :disable="!meta.valid" type="submit">
        <span>Continue</span>
      </q-btn>
      <q-btn @click="emit('back')">Back</q-btn>
    </q-stepper-navigation>
  </q-form>
  <div v-show="result">
    <div class="row q-gutter-md">
      <AddressDisplay
        :address="correctedAddress"
        :verification="result"
        label="Verification Result"
        @use="useCorrected"
        @back="backToInput"
      />
      <AddressDisplay
        :address="values.address"
        label="Input Address"
        @use="useOriginal"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import AddressDisplay from 'components/User/AddressDisplay.vue'
import VeeInput from 'components/_atoms/VeeInput.vue'
import VeeSelect from 'components/_atoms/VeeSelect.vue'
import TipBox from 'components/_molecules/TipBox.vue'
import {
  Address,
  VerificationResult,
  useAddressVerification,
} from 'src/composables/addressVerification'
import { useUserSchema } from 'src/composables/schemas'
import { UsaStates } from 'usa-states'
import { useForm } from 'vee-validate'
import { ref, toRef } from 'vue'
const schema = useUserSchema().pick(['address'])

type Schema = {
  address: {
    city: string
    state: string
    postal_code: string
    line1: string
    line2: string
  }
}
const emit = defineEmits<{
  (e: 'continue', v: Schema): void
  (e: 'back'): void
}>()

interface Props {
  initialValues: Schema
}
const usStates = new UsaStates().states.map((v) => ({
  label: v.name,
  value: v.abbreviation,
}))
const props = defineProps<Props>()
const result = ref<null | VerificationResult>(null)
const correctedAddress = ref<null | Address>(null)
const { verify: verifyAddress, enabled: verificationEnabled } =
  useAddressVerification()

const initialValues = toRef(props, 'initialValues')
const { handleSubmit, meta, values } = useForm({
  validationSchema: schema,
  initialValues,
})

const continueBtn = handleSubmit(async (values) => {
  if (!verificationEnabled.value) {
    emit('continue', values)
    return
  }
  const verificationResult = await verifyAddress(values.address)
  if (!verificationResult) {
    emit('continue', values)
    return
  }
  if (
    verificationResult.noIssues &&
    verificationResult.unchanged &&
    verificationResult.correctedAddress
  ) {
    emit('continue', { address: verificationResult.correctedAddress })
  }
  result.value = verificationResult.result
  correctedAddress.value = verificationResult.correctedAddress
})

const useCorrected = () => {
  if (correctedAddress.value) {
    emit('continue', { address: correctedAddress.value })
  }
}

const useOriginal = () => {
  emit('continue', values)
}

const backToInput = () => {
  result.value = null
  correctedAddress.value = null
}
</script>
