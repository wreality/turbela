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
import type { PromiseResolvers } from 'src/components/_molecules/FormBuilder.vue'
import type { Badge } from 'src/gql/graphql'
import { badgeSchema } from 'src/composables/schemas'

definePage({
  name: 'settings:badges:view',
  meta: {
    pageTitle: 'Badge Setup',
    crumb: {
      label: 'Edit Badge',
    },
  },
})

const route = useRoute('settings:badges:view')

const fields = [
  {
    name: 'name',
    type: 'input',
  },
]
const badgeQuery = useQuery(GetBadgeDocument, { id: route.params.id })
const badge = computed(() => badgeQuery.result.value?.badge as Badge)

const { set } = useScope()
set({ badgeName: computed(() => badgeQuery.result.value?.badge?.name ?? '') })

//Mutation
const { mutate: saveBadge } = useMutation(UpdateBadgeDocument)

const onSave = async (
  values: any,
  promise: PromiseResolvers,
  formState: typeof SubmissionContext<Badge>
) => {
  try {
    const result = await saveBadge({ id: route.params.id, ...values })
    if (!result?.data?.badge?.update) {
      throw new Error('Failed to save badge')
    }
    formState.resetForm({ values: result?.data?.badge?.update, submitCount: 1 })
    promise.resolve(true)
  } catch {
    promise.reject()
  }
}
</script>

<script lang="ts">
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
