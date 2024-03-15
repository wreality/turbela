<template>
  <q-form @submit="continueBtn">
    <VeeInput name="email" :debounce="300" autofocus>
      <template #append>
        <q-spinner v-if="meta.pending" />
      </template>
      <template #error-registered>
        This email is already registered.
        <q-btn flat size="sm" @click="gotoExistingAccount">
          Goto User's Account
        </q-btn>
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
import { InferType, StringSchema, object, reach } from 'yup'

const { userExists } = useLogin()
const schema = object({
  email: (reach(userSchema, 'email') as StringSchema).test(
    'unused-email',
    'registered',
    async (value) => {
      try {
        if (!value) {
          return false
        }
        return !(await userExists(value))
      } catch {
        return false
      }
    }
  ),
})
type Schema = InferType<typeof schema>
interface Props {
  initialValues: Schema
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'continue', v: Schema): void
}>()

const { handleSubmit, meta, values } = useForm({
  validationSchema: schema,
  initialValues: props.initialValues,
})

const { push } = useRouter()
const continueBtn = handleSubmit((values) => {
  emit('continue', values)
})
const { findUser } = useFindUser()
async function gotoExistingAccount() {
  if (!values.email) {
    return
  }
  const user = await findUser(values.email)

  if (!user?.id) {
    return
  }

  push({ name: 'users:view', params: { id: user.id } })
}
</script>
