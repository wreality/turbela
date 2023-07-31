<template>
  <q-form @submit="continueBtn">
    <div class="column q-gutter-sm">
      <VeeInput name="name" autofocus />
      <VeeInput name="preferred_name" />
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
import VeeInput from 'components/_atoms/VeeInput.vue'
import { userSchema } from 'src/composables/schemas'
import { useForm } from 'vee-validate'
import { toRef } from 'vue'
import { InferType } from 'yup'

const schema = userSchema.pick(['name', 'preferred_name'])
type Schema = InferType<typeof schema>

const emit = defineEmits<{
  (e: 'continue', v: Schema): void
  (e: 'back'): void
}>()

interface Props {
  initialValues: Schema
}

const props = defineProps<Props>()

const initialValues = toRef(props, 'initialValues')
const { handleSubmit, meta } = useForm<Schema>({
  validationSchema: schema,
  initialValues,
})

const continueBtn = handleSubmit((values) => {
  emit('continue', values)
})
</script>
