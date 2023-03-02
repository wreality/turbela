<template>
  <q-card>
    <q-form v-if="badge" @submit.prevent="onSave">
      <q-card-section>
        <VQWrap t-prefix="badges.edit">
          <VeeInput name="name" />
        </VQWrap>
      </q-card-section>
      <q-card-actions>
        <FormActions />
      </q-card-actions>
    </q-form>
  </q-card>
</template>

<script setup lang="ts">
import VQWrap from 'components/_atoms/i18nPrefix.vue'
import VeeInput from 'components/_atoms/VeeInput.vue'
import FormActions from 'components/_molecules/FormActions.vue'

import { useMutation, useQuery } from '@vue/apollo-composable'
import { pick } from 'lodash'
import { useBreadcrumbTags } from 'src/composables/breadcrumbs'
import { useBadgeSchema } from 'src/composables/schemas'
import { GetBadgeDocument, UpdateBadgeDocument } from 'src/generated/graphql'
import { useForm } from 'vee-validate'
import { computed } from 'vue'

import type { Badge } from 'src/generated/graphql'

interface Props {
  id: Badge['id']
}

const props = defineProps<Props>()

const badgeQuery = useQuery(GetBadgeDocument, { id: props.id })
const badge = computed(
  () => pick(badgeQuery.result.value?.badge, ['name']) ?? {}
)

const { setTag } = useBreadcrumbTags()
setTag(
  '#badge_name',
  computed(() => badgeQuery.result.value?.badge?.name ?? '')
)

//Mutation
const { mutate: saveBadge } = useMutation(UpdateBadgeDocument)
const validationSchema = useBadgeSchema()
const formContext = useForm({
  validationSchema,
  initialValues: badge,
})
const { handleSubmit, resetForm: discard } = formContext
const onSave = handleSubmit((values) => {
  saveBadge({ id: props.id, ...values })
})
</script>

<script lang="ts">
import { gql } from 'graphql-tag'
import { badgeFieldsFragment } from 'src/graphql/queries'
gql`
  mutation UpdateBadge($id: ID!, $name: String) {
    updateBadge(id: $id, input: { name: $name }) {
      id
      ...badgeFields
    }
  }
  ${badgeFieldsFragment}
`

gql`
  query GetBadge($id: ID!) {
    badge(id: $id) {
      id
      ...badgeFields
    }
  }
  ${badgeFieldsFragment}
`
</script>
