<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="q-dialog-plugin" style="min-width: 600px">
      <q-card-section class="text-center text-h6 q-pa-none">
        <div class="q-py-sm">Revoke Badge</div>
      </q-card-section>
      <q-card-section>
        <VeeForm
          t-prefix="users.revokeBadge"
          class="q-gutter-md q-pa-md"
          @submit="onSubmit"
        >
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
          Revoke Badge
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
  UpdateUserBadgesDocument,
  UpdateUserBadgesInput,
} from 'src/gql/graphql'
import { useForm } from 'vee-validate'
import { revokeBadgeSchema } from 'src/composables/schemas/badge'
import VeeInput from '../_atoms/VeeInput.vue'
import { useMutation } from '@vue/apollo-composable'

interface Props {
  userId: string
  badgeId: string
}
const props = defineProps<Props>()

defineEmits([...useDialogPluginComponent.emits])

const { dialogRef, onDialogHide, onDialogOK } = useDialogPluginComponent()

const { handleSubmit, meta } = useForm({
  validationSchema: revokeBadgeSchema,
  initialValues: {
    notes: '',
  },
})

const { mutate } = useMutation(UpdateUserBadgesDocument)
const onSubmit = handleSubmit(async (values) => {
  const input = {
    id: props.userId,
    revoke: [
      {
        badge_id: props.badgeId,
        notes: values.notes,
      },
    ],
  } as UpdateUserBadgesInput
  await mutate({
    input,
  })
  onDialogOK()
})
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
