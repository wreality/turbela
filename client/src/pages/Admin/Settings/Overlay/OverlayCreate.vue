<template>
  <OverlayEditor @submit="onEditorSubmit" />
</template>

<script setup lang="ts">
import { useMutation } from '@vue/apollo-composable'
import OverlayEditor from 'components/_forms/Overlay/OverlayEditor.vue'
import { createOverlaySchema } from 'src/composables/schemas/overlay'
import { CreateOverlayDocument, CreateOverlayInput } from 'src/gql/graphql'
import { useForm } from 'vee-validate'

const { handleSubmit } = useForm({ validationSchema: createOverlaySchema })
const { mutate: createOverlay } = useMutation(CreateOverlayDocument, {
  context: { hasUpload: true },
})

const { push } = useRouter()
const onEditorSubmit = handleSubmit(async (values) => {
  const overlay = await createOverlay(values as CreateOverlayInput)
  push({
    name: 'admin:overlays:edit',
    params: { id: overlay?.data?.createOverlay?.id },
  })
})
</script>

<script lang="ts">
import { graphql } from 'src/gql'
import { useRouter } from 'vue-router'

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
