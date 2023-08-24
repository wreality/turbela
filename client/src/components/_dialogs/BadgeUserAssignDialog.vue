<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="q-dialog-plugin" style="min-width: 600px">
      <q-card-section class="text-center text-h6 q-pa-none">
        <div class="q-py-sm">Award Badge</div>
      </q-card-section>
      <q-card-section>
        <VeeForm
          t-prefix="badges.assignUsers"
          class="q-gutter-md q-pa-md"
          @submit="onSubmit"
        >
          <UserSelect name="user_ids" multiple />
          <UserSelect name="instructor_id" />
          <VeeInput name="notes" type="textarea" />
        </VeeForm>
      </q-card-section>
      <q-separator />
      <q-card-actions class="row q-pa-none justify-between" align="right">
        <q-btn
          :disabled="!meta.valid"
          class="col"
          size="xl"
          color="primary"
          @click="onSubmit"
        >
          Award Badge
        </q-btn>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import UserSelect from '../_atoms/UserSelect.vue'
import VeeForm from '../_atoms/VeeForm.vue'
import { useDialogPluginComponent } from 'quasar'
import {
  UpdateBadgeUsersDocument,
  UpdateBadgeUsersInput,
} from 'src/generated/graphql'

import { useForm } from 'vee-validate'
import { badgeAssignUsersSchema } from 'src/composables/schemas'
import VeeInput from '../_atoms/VeeInput.vue'

interface Props {
  badgeId: string
}
const props = defineProps<Props>()

defineEmits([...useDialogPluginComponent.emits])

const { dialogRef, onDialogHide, onDialogOK } = useDialogPluginComponent()

const { handleSubmit, meta } = useForm({
  validationSchema: badgeAssignUsersSchema,
  initialValues: {
    user_ids: [] as Record<string, any>[],
    instructor_id: null as Record<string, any> | null,
    notes: '',
  },
})

const { mutate } = useMutation(UpdateBadgeUsersDocument)
const onSubmit = handleSubmit(async (values) => {
  const input = {
    id: props.badgeId,
    grant: values.user_ids.map((value) => ({
      user_id: value.id,
      instructor_id: values.instructor_id?.id,
      notes: values.notes,
    })),
  } as UpdateBadgeUsersInput
  await mutate({
    input,
  })
  onDialogOK()
})
</script>

<script lang="ts">
import { gql } from 'graphql-tag'
import { useMutation } from '@vue/apollo-composable'
gql`
  mutation UpdateBadgeUsers($input: UpdateBadgeUsersInput!) {
    badge {
      updateBadgeUsers(input: $input) {
        id
      }
    }
  }
`
</script>
<style lang="scss" scoped>
body.body--dark {
  .q-card .q-card__section:first-child {
    background-color: $indigo-10;
  }
}
body.body--light {
  .q-card .q-card__section:first-child {
    background-color: $blue-3;
  }
}
</style>
