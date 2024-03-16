<template>
  <OverlayEditor
    v-if="result"
    @submit="onEditorSubmit"
    @cancel="$router.push({ name: '/admin/overlays/' })"
  />
</template>

<script setup lang="ts">
import { type UpdateOverlayInput } from 'src/gql/graphql'

definePage({
  meta: {
    crumb: { label: 'Edit' },
  },
})

const route = useRoute('/admin/overlays/[id]')

const variables = reactive({ id: route.params.id })

watch(
  () => route.params.id,
  (newId) => {
    variables.id = newId
  }
)

const { result } = useQuery(OverlayDocument, variables)

const { handleSubmit, resetForm } = useForm<UpdateOverlayInput>({
  validationSchema: updateOverlaySchema,
})

watch(
  () => result.value?.overlay,
  (newResult) => {
    if (newResult) {
      resetForm({
        values: {
          name: newResult.name,
          type: newResult.type,
          spec: newResult.resolved_spec,
        },
      })
    }
  }
)

const { mutate: updateOverlay } = useMutation(UpdateOverlayDocument, {
  context: { hasUpload: true },
})
const onEditorSubmit = handleSubmit(async (values) => {
  await updateOverlay({
    ...values,
    id: route.params.id,
  } as UpdateOverlayInput)
})
</script>

<script lang="ts">
graphql(`
  query Overlay($id: ID!) {
    overlay(id: $id) {
      id
      resolved_spec
      name
      type
    }
  }
`)
graphql(`
  mutation UpdateOverlay(
    $id: ID!
    $name: String
    $type: OverlayType
    $spec: String
    $upload: Upload
  ) {
    updateOverlay(
      input: { id: $id, name: $name, type: $type, spec: $spec, upload: $upload }
    ) {
      id
      name
      type
      resolved_spec
      spec
    }
  }
`)
</script>
