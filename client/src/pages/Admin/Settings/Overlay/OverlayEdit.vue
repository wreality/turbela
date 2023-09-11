<template>
  <OverlayEditor v-if="result" @submit="onEditorSubmit" />
</template>

<script setup lang="ts">
import { useMutation, useQuery } from '@vue/apollo-composable'
import OverlayEditor from 'components/_forms/Overlay/OverlayEditor.vue'
import { updateOverlaySchema } from 'src/composables/schemas/overlay'
import {
  OverlayDocument,
  UpdateOverlayDocument,
  UpdateOverlayInput,
} from 'src/generated/graphql'
import { useForm } from 'vee-validate'

interface Props {
  id: string
}

const props = defineProps<Props>()

const { result } = useQuery(OverlayDocument, props)

const initialValues = computed(() => {
  if (!result.value) {
    return undefined
  }
  return {
    name: result.value.overlay?.name,
    spec: result.value.overlay?.resolved_spec,
    type: result.value.overlay?.type,
  }
})

const { handleSubmit } = useForm({
  validationSchema: updateOverlaySchema,
  initialValues: initialValues,
})
const { mutate: updateOverlay } = useMutation(UpdateOverlayDocument, {
  context: { hasUpload: true },
})
const onEditorSubmit = handleSubmit(async (values) => {
  await updateOverlay({
    id: props.id,
    ...values,
  } as UpdateOverlayInput)
})
</script>

<script lang="ts">
import { gql } from 'graphql-tag'
import { computed } from 'vue'

gql`
  query Overlay($id: ID!) {
    overlay(id: $id) {
      id
      resolved_spec
      name
      type
    }
  }
`
gql`
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
`
</script>
