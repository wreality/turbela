<template lang="pug">
q-form(@submit='saveFeature')
  FeatureCardShell
    template(#header)
      q-input(
        v-model='$v.name.$model as string',
        outlined,
        label='Name',
        dense,
        :error='$v.name.$error'
      )
        template(#error)
          | Please enter a name
    template(#details)
      q-chip.text-bold(
        v-for='type in validTypes',
        :label='type',
        :key='type',
        :color='form.type === type ? "secondary" : ""',
        @click='select(type)',
        size='sm',
        clickable
      )
    template(#actions)
      q-btn.col-3(label='Save', flat, size='sm', type='submit')
      q-btn.col-3.offset-6(label='Cancel', flat, size='sm', @click='cancel')
</template>

<script setup lang="ts">
import FeatureCardShell from './molecules/FeatureCardShell.vue'
import { reactive } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import type { Feature, FeatureType } from 'src/generated/graphql'
import { validFeatureType } from 'src/composables/validators'

type FeatureData = Pick<Feature, 'name' | 'type'>

interface Emits {
  (e: 'create', data: FeatureData): void
  (e: 'cancel'): void
}
const validTypes: Array<FeatureType> = ['LIMIT', 'GRANT', 'TRACK']

const emit = defineEmits<Emits>()

const form = reactive<FeatureData>({
  name: '',
  type: 'LIMIT',
})

const rules = {
  name: { required },
  type: { validFeatureType },
}
const $v = useVuelidate(rules, form)

function saveFeature() {
  if ($v.value.$invalid) {
    return
  }
  emit('create', form)
  resetForm()
}

function cancel() {
  emit('cancel')
  resetForm()
}

function select(type: FeatureType) {
  form.type = type
}

function resetForm() {
  form.name = ''
}
</script>
