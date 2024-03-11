<template>
  <VeeForm :t-prefix="tPrefix" @submit="onFormSubmit">
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
import { SubmissionContext, useForm } from 'vee-validate'
import type { Component } from 'vue'
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

export type PromiseResolvers = {
  resolve: (value: unknown) => void
  reject: () => void
}
interface Props {
  fields: Field[]
  tPrefix: string
  validationSchema?: AnyObjectSchema
  initialValues: any
}
const props = defineProps<Props>()

interface Emits {
  (
    e: 'submit',
    input: any,
    success: PromiseResolvers,
    formState: SubmissionContext
  ): void
}
const emit = defineEmits<Emits>()

const validationSchema = toRef(props, 'validationSchema')
const initialValues = toRef(props, 'initialValues')
const { handleSubmit } = useForm({
  validationSchema,
  initialValues,
})

const onFormSubmit = handleSubmit(async (values: any, formState) => {
  return new Promise((resolve, reject) => {
    emit('submit', values, { resolve, reject }, formState)
  })
})

const comps = computed(() =>
  props.fields.map((v) => ({
    is: isComponent(v.type),
    props: Object.assign({ name: v.name }, v.props),
  }))
)

function isComponent(type: string): Component {
  return (
    {
      input: VeeInput,
      toggle: VeeToggle,
    }[type] ?? VeeInput
  )
}
</script>

<style scoped></style>
