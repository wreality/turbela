<template>
  <q-card flat>
    <q-card-section>
      <FormBuilder
        v-if="badge"
        class="q-gutter-md"
        t-prefix="settings.badge.edit"
        :fields="fields"
        :validation-schema="badgeSchema"
        :initial-values="badge"
        @submit="onSave"
      ></FormBuilder>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { badgeSchema } from 'src/composables/schemas/badge'
import type { Badge } from 'src/gql/graphql'
definePage({
  name: 'settings:badges:new',
  meta: {
    pageTitle: 'New Badge',
    crumb: {
      label: 'Create',
    },
  },
})
const fields = [
  {
    name: 'name',
    type: 'input',
  },
]

const badge = {
  name: '',
}

//Mutation
const { mutate: saveBadge } = useMutation(CreateBadgeDocument)

const { push } = useRouter()

const onSave = async (values: Badge) => {
  await saveBadge(values)
  push({ name: 'settings:badges' })
}
</script>

<script lang="ts">
graphql(`
  mutation CreateBadge($name: String!) {
    badge {
      create(input: { name: $name }) {
        id
        ...badgeFields
      }
    }
  }
  ${badgeFieldsFragment}
`)
</script>
