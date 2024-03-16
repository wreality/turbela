<template>
  <OverlayEditor @submit="onEditorSubmit" />
</template>

<script setup lang="ts">
import type { CreateOverlayInput } from 'src/gql/graphql'

definePage({
  meta: {
    crumb: { label: 'New' },
  },
})

const { handleSubmit } = useForm({ validationSchema: createOverlaySchema })
const { mutate: createOverlay } = useMutation(CreateOverlayDocument, {
  context: { hasUpload: true },
})

const { push } = useRouter()
const onEditorSubmit = handleSubmit(async (values) => {
  const overlay = await createOverlay(values as CreateOverlayInput)
  push({
    name: '/admin/overlays/[id]',
    params: { id: overlay?.data?.createOverlay?.id as string },
  })
})
</script>

<script lang="ts">
graphql(`
  mutation CreateOverlay(
    $name: String!
    $type: OverlayType!
    $spec: String!
    $upload: Upload!
  ) {
    createOverlay(
      input: { name: $name, type: $type, spec: $spec, upload: $upload }
    ) {
      id
      spec
      name
      type
      resolved_spec
    }
  }
`)
</script>
