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
      >
      </FormBuilder>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import FormBuilder from 'src/components/_molecules/FormBuilder.vue'
import { badgeSchema } from 'src/composables/schemas/badge'
import { Badge, CreateBadgeDocument } from 'src/generated/graphql'
import { useMutation } from '@vue/apollo-composable'
import { useRouter } from 'vue-router'
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
  push({ name: 'admin:setup:badges' })
}
</script>

<script lang="ts">
import { gql } from 'graphql-tag'
import { badgeFieldsFragment } from 'src/graphql/queries'
gql`
  mutation CreateBadge($name: String!) {
    badge {
      create(input: { name: $name }) {
        id
        ...badgeFields
      }
    }
  }
  ${badgeFieldsFragment}
`
</script>
