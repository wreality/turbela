<template>
  <div class="q-pa-md">
    <VQWrap t-prefix="users.create">
      <q-stepper v-model="step" header-nav color="primary" animated flat>
        <q-step
          :name="'Email'"
          title="Email Address"
          v-bind="emailPage.stepBind"
        >
          <EmailStep v-bind="emailPage.compBind" v-on="emailPage.on" />
        </q-step>
        <q-step
          name="Basic"
          title="Basic Info"
          icon="person"
          v-bind="basicPage.stepBind"
        >
          <BasicStep v-bind="basicPage.compBind" v-on="basicPage.on" />
        </q-step>

        <q-step
          name="Address"
          title="Address"
          icon="home"
          v-bind="addressPage.stepBind"
        >
          <AddressStep v-bind="addressPage.compBind" v-on="addressPage.on" />
        </q-step>

        <q-step
          name="Phones"
          title="Phone Numbers"
          icon="phone"
          v-bind="phonePage.stepBind"
        >
          <PhoneStep v-bind="phonePage.compBind" v-on="phonePage.on" />
        </q-step>
        <q-step
          name="Confirm"
          title="Confirm and Continue"
          :disable="!meta.valid"
          icon="arrow_right"
        >
          <div>Email: {{ values.email }}</div>
          <div>Name: {{ values.name }}</div>
          <div>Preferred Name: {{ values.preferred_name }}</div>
          <AddressDisplay :address="values.address" label="Address" />
          <ul>
            <li v-for="(phone, index) in values.phones" :key="'phone' + index">
              {{ phone.number }} ({{ phone.type }})
            </li>
          </ul>
          <q-btn color="primary" :loading="isSubmitting" @click="submitForm">
            Save New User
          </q-btn>
        </q-step>
      </q-stepper>
    </VQWrap>
    <br />
  </div>
</template>

<script setup lang="ts">
import type { UserSchema } from 'src/composables/schemas'
import type { CreateUserMutationVariables } from 'src/gql/graphql'
import type { InferType } from 'yup'
import { pick } from 'lodash'

definePage({
  name: 'users:new',
  meta: {
    appIcon: 'user:new',
    auth: {
      needsAbilities: 'create:User',
    },
    pageTitle: 'Create New User',
    crumb: { label: 'Create User', icon: 'person' },
  },
})

const initialValues: UserSchema = {
  email: '',
  name: '',
  preferred_name: '',
  address: {
    line1: '',
    line2: '',
    city: '',
    state: '',
    postal_code: '',
  },
  phones: [],
}

const form = useForm<UserSchema>({
  validationSchema: userSchema,
  initialValues,
})
const { meta, values, isSubmitting, handleSubmit } = form

const emailPage = reactive(usePageValues('Email', ['email']))
const basicPage = reactive(usePageValues('Basic', ['preferred_name', 'name']))
const addressPage = reactive(usePageValues('Address', ['address']))
const phonePage = reactive(usePageValues('Phones', ['phones']))

const step = ref('Email')
const stepOrder = ['Email', 'Basic', 'Address', 'Phones', 'Confirm']
const currentStepNumber = computed(() =>
  stepOrder.findIndex((v) => v === step.value)
)
const { mutate: saveUser } = useMutation(CreateUserDocument)
const { push } = useRouter()
const submitForm = handleSubmit(async (values) => {
  try {
    const result = await saveUser(values as CreateUserMutationVariables)
    const id = result?.data?.createUser.id ?? null
    if (id !== null) {
      push({ name: 'users:view', params: { id } })
    }
  } catch (err) {}
})

function usePageValues(name: string, fields: Array<keyof UserSchema>) {
  const subschema = userSchema.pick(fields)
  const initialValues = computed<InferType<typeof subschema>>(() =>
    pick(form.values, fields)
  )
  const compBind = {
    initialValues,
  }
  const done = computed(
    () =>
      !Object.keys(form.errors.value).some((v) =>
        fields.includes(v.split('.')[0] as keyof UserSchema)
      )
  )

  const error = computed(() => {
    const ourStepNumber = stepOrder.findIndex((v) => v === name)

    return currentStepNumber.value > ourStepNumber ? !done.value : false
  })
  return {
    compBind,
    stepBind: {
      done,
      error,
    },
    on: {
      continue: (incomingValues: Record<any, any>) => {
        form.setValues(Object.assign({}, values, incomingValues))
        form.validate()
        step.value = stepOrder[currentStepNumber.value + 1]
      },
      back: () => {
        if (currentStepNumber.value == 0) {
          return
        }
        step.value = stepOrder[currentStepNumber.value - 1]
      },
    },
  }
}
</script>

<script lang="ts">
graphql(`
  mutation CreateUser(
    $email: String!
    $name: String!
    $preferred_name: String
    $phones: [PhonesInput!]!
    $address: AddressInput!
  ) {
    createUser(
      input: {
        email: $email
        name: $name
        preferred_name: $preferred_name
        phones: $phones
        address: $address
      }
    ) {
      id
      email
      name
      preferred_name
      phones {
        number
        type
      }
      address {
        line1
        line2
        city
        state
        postal_code
      }
    }
  }
`)
</script>
