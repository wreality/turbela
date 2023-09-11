<template>
  <q-form @submit="continueBtn">
    <div class="column q-gutter-md align-center items-center">
      <TipBox name="addPhone" />
      <q-card v-if="values.phones" bordered flat class="col">
        <div v-for="(field, index) in fields" :key="field.key">
          <q-card-section class="row q-gutter-md q-py-sm q-pt-md">
            <VeeInput
              autofocus
              :name="`phones[${index}].number`"
              mask="(###) ###-####"
              unmasked-value
            />
            <VeeSelect :name="`phones[${index}].type`" :options="phoneTypes" />
            <q-btn dense icon="delete" flat @click="remove(index)" />
          </q-card-section>
          <q-separator />
        </div>
      </q-card>
      <q-btn ref="addBtnRef" class="col" icon="add" @click="addItem"
        >Add Another Number</q-btn
      >
    </div>
    <q-stepper-navigation class="q-gutter-md">
      <q-btn class="" color="primary" :disable="!meta.valid" type="submit">
        <span>Continue</span>
      </q-btn>
      <q-btn @click="emit('back')">Back</q-btn>
    </q-stepper-navigation>
  </q-form>
</template>

<script setup lang="ts">
import VeeInput from 'components/_atoms/VeeInput.vue'
import VeeSelect from 'components/_atoms/VeeSelect.vue'
import TipBox from 'components/_molecules/TipBox.vue'
import { userSchema } from 'src/composables/schemas/user'
import { useFieldArray, useForm } from 'vee-validate'
import { ref, toRef, watch } from 'vue'
import { InferType } from 'yup'

const schema = userSchema.pick(['phones'])
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
const { handleSubmit, meta, values } = useForm({
  validationSchema: schema,
  initialValues,
})
const phoneTypes = ['MOBILE', 'WORK', 'HOME']
const { remove, push, fields } = useFieldArray('phones')
const continueBtn = handleSubmit((values) => {
  emit('continue', values as Schema)
})

function addItem() {
  push({ number: '', type: 'MOBILE' })
}

const addBtnRef = ref()

watch(addBtnRef, (newValue) => {
  if (newValue) {
    newValue.$el.focus()
  }
})
</script>
