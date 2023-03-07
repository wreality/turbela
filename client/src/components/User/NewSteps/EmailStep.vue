<template>
  <q-form @submit="continueBtn">
    <VeeInput name="email" :debounce="300" autofocus>
      <template #append>
        <q-spinner v-if="meta.pending" />
      </template>
    </VeeInput>
    <q-stepper-navigation>
      <q-btn
        color="primary"
        :disable="!meta.valid"
        :loading="meta.pending"
        type="submit"
      >
        <span>Continue</span>
      </q-btn>
    </q-stepper-navigation>
  </q-form>
</template>

<script setup lang="ts">
import VeeInput from 'src/components/_atoms/VeeInput.vue'
import { useUserSchema } from 'src/composables/schemas'
import { useForm } from 'vee-validate'
import { toRef } from 'vue'
import { InferType } from 'yup'

const schema = useUserSchema().pick(['email'])
type Schema = InferType<typeof schema>
interface Props {
  initialValues: Schema
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'continue', v: Schema): void
}>()

const initialValues = toRef(props, 'initialValues')

const { handleSubmit, meta } = useForm({
  validationSchema: schema,
  initialValues,
})

const continueBtn = handleSubmit((values) => {
  emit('continue', values as Schema)
})
</script>
