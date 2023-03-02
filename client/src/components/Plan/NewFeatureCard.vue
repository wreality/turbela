<template>
  <q-form @submit="saveFeature">
    <VQWrap t-prefix="plans.features.create">
      <FeatureCardShell>
        <template #header>
          <VeeInput name="name" />
        </template>

        <template #details>
          <q-btn-toggle
            v-model="typeValue"
            size="sm"
            dense
            :options="options"
          />
          <div v-if="typeErrors.length">
            {{ typeErrors.join(',') }}
          </div>
        </template>
        <template #actions>
          <q-btn
            class="col-3"
            label="Save"
            flat
            size="sm"
            type="submit"
          ></q-btn>
          <q-btn
            class="col-3 offset-6"
            label="Cancel"
            flat
            size="sm"
            @click="cancel"
          ></q-btn>
        </template>
      </FeatureCardShell>
    </VQWrap>
  </q-form>
</template>

<script setup lang="ts">
import VeeInput from 'components/_atoms/VeeInput.vue'
import VQWrap from 'components/_atoms/i18nPrefix.vue'
import FeatureCardShell from 'components/_molecules/FeatureCardShell.vue'
import { useFeatureSchema } from 'src/composables/schemas'
import { FeatureType, MutationCreateFeatureArgs } from 'src/generated/graphql'
import { useField, useForm } from 'vee-validate'

interface Emits {
  (e: 'create', data: MutationCreateFeatureArgs): void
  (e: 'cancel'): void
}

const emit = defineEmits<Emits>()

const validationSchema = useFeatureSchema()

const { handleSubmit, resetForm } = useForm({ validationSchema })

const { value: typeValue, errors: typeErrors } = useField<string>('type')
const options = Object.values(FeatureType).map((v) => {
  return {
    label: v,
    value: v,
  }
})
const saveFeature = handleSubmit((values) => {
  emit('create', values)
  resetForm()
})

function cancel() {
  emit('cancel')
  resetForm()
}
</script>
