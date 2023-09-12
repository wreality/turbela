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
        @submit.prevent="onSave"
      >
      </FormBuilder>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { useMutation, useQuery } from '@vue/apollo-composable'
import { pick } from 'lodash'
import FormBuilder from 'src/components/_molecules/FormBuilder.vue'
import { useScope } from 'src/composables/breadcrumbs'
import { badgeSchema } from 'src/composables/schemas/badge'
import {
  type Badge,
  GetBadgeDocument,
  UpdateBadgeDocument,
} from 'src/gql/graphql'
import { computed } from 'vue'

interface Props {
  id: Badge['id']
}

const props = defineProps<Props>()

const fields = [
  {
    name: 'name',
    type: 'input',
  },
]
const badgeQuery = useQuery(GetBadgeDocument, { id: props.id })
const badge = computed(
  () => pick(badgeQuery.result.value?.badge, ['name']) ?? {}
)

const { set } = useScope()
set({ badgeName: computed(() => badgeQuery.result.value?.badge?.name ?? '') })

//Mutation
const { mutate: saveBadge } = useMutation(UpdateBadgeDocument)

const onSave = (values: any) => {
  saveBadge({ id: props.id, ...values })
}
</script>

<script lang="ts">
import { graphql } from 'src/gql'
import { badgeFieldsFragment } from 'src/graphql/queries'
graphql(`
  mutation UpdateBadge($id: ID!, $name: String) {
    badge {
      update(id: $id, input: { name: $name }) {
        id
        ...badgeFields
      }
    }
  }
  ${badgeFieldsFragment}
`)

graphql(`
  query GetBadge($id: ID!) {
    badge(id: $id) {
      id
      ...badgeFields
    }
  }
  ${badgeFieldsFragment}
`)
</script>
