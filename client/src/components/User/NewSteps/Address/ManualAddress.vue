<template>
  <q-form class="column q-gutter-sm" @submit="continueBtn">
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
</template>

<script setup lang="ts">
import type { VerificationReturn } from 'src/composables/gmaps'
import { UsaStates } from 'usa-states'
import type { InferType } from 'yup'

const schema = userSchema.pick(['address'])
type Schema = InferType<typeof schema>

const emit = defineEmits<{
  (e: 'verify', v: Schema): void
  (e: 'back'): void
}>()

interface Props {
  initialValues: Schema
  verificationReturn: VerificationReturn
}
const usStates = new UsaStates().states.map((v) => ({
  label: v.name,
  value: v.abbreviation,
}))
const props = defineProps<Props>()
const { handleSubmit, meta, setValues } = useForm({
  validationSchema: schema,
  initialValues: props.initialValues,
})
const continueBtn = handleSubmit(async (values) => {
  emit('verify', values)
})

onMounted(() => {
  if (props.verificationReturn) {
    setValues({ address: props.verificationReturn.address })
  }
})
</script>
