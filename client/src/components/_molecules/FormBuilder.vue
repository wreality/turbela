<template>
  <VeeForm :t-prefix="tPrefix" @submit.prevent="onFormSubmit">
    <component
      :is="comp.is"
      v-for="comp in comps"
      v-bind="comp.props"
      :key="comp.props.name"
    />
    <slot name="actions">
      <FormActions />
    </slot>
  </VeeForm>
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate'
import { computed, toRef } from 'vue'
import { AnyObjectSchema } from 'yup'
import VeeForm from '../_atoms/VeeForm.vue'
import VeeInput from '../_atoms/VeeInput.vue'
import VeeToggle from '../_atoms/VeeToggle.vue'
import FormActions from './FormActions.vue'

type Field = {
  type: string
  name: string
  props?: Record<string, any>
}
interface Props {
  fields: Field[]
  tPrefix: string
  validationSchema?: AnyObjectSchema
  initialValues: any
}
const props = defineProps<Props>()

interface Emits {
  (e: 'submit', input: any): void
}
const emit = defineEmits<Emits>()

const validationSchema = toRef(props, 'validationSchema')
const initialValues = toRef(props, 'initialValues')
const { handleSubmit } = useForm({
  validationSchema,
  initialValues,
})

const onFormSubmit = handleSubmit((values: any) => {
  emit('submit', values)
})

const comps = computed(() =>
  props.fields.map((v) => ({
    is: component(v.type),
    props: Object.assign({ name: v.name }, v.props),
  }))
)

function component(type: string) {
  return {
    input: VeeInput,
    toggle: VeeToggle,
  }[type]
}
</script>

<style scoped></style>
