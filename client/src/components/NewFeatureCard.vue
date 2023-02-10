<template>
  <q-form @submit="saveFeature">
    <FeatureCardShell>
      <template #header>
        <q-input
          v-model="$v.name.$model"
          outlined
          label="Name"
          dense
          :error="$v.name.$error"
        >
          <template #error>Please enter a name</template>
        </q-input>
      </template>
      <template #details>
        <q-chip
          v-for="type in validTypes"
          :key="type"
          class="text-bold"
          :label="type"
          :color="form.type === type ? 'secondary' : ''"
          size="sm"
          clickable
          @click="select(type)"
        ></q-chip>
      </template>
      <template #actions>
        <q-btn class="col-3" label="Save" flat size="sm" type="submit"></q-btn>
        <q-btn
          class="col-3 offset-6"
          label="Cancel"
          flat
          size="sm"
          @click="cancel"
        ></q-btn>
      </template>
    </FeatureCardShell>
  </q-form>
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
