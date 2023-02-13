<template>
  <OverlayEditor @submit="onEditorSubmit" />
</template>

<script setup lang="ts">
import OverlayEditor from 'src/components/forms/Overlay/OverlayEditor.vue'
import { useForm } from 'vee-validate'
import { useOverlaySchema } from 'src/composables/schemas'
import {
  CreateOverlayDocument,
  CreateOverlayInput,
} from 'src/generated/graphql'
import { useMutation } from '@vue/apollo-composable'

const schema = useOverlaySchema('create')
const { handleSubmit } = useForm({ validationSchema: schema })
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
import { gql } from 'graphql-tag'
import { useRouter } from 'vue-router'

gql`
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
`
</script>
