<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="q-dialog-plugin" style="min-width: 600px">
      <q-card-section class="text-center text-h6 q-pa-none">
        <div class="q-py-sm">Award Badge</div>
      </q-card-section>
      <q-card-section>
        <VeeForm
          t-prefix="users.assignBadge"
          class="q-gutter-md q-pa-md"
          @submit="onSubmit"
        >
          <BadgeSelect name="id" />
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
          >Award Badge</q-btn
        >
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import UserSelect from '../_atoms/UserSelect.vue'
import BadgeSelect from '../_atoms/BadgeSelect.vue'
import VeeForm from '../_atoms/VeeForm.vue'
import { useDialogPluginComponent } from 'quasar'
import { User, UpdateUserBadgesDocument } from 'src/generated/graphql'
import type { SetRequired } from 'type-fest'
import { useForm } from 'vee-validate'
import { userAssignBadgeSchema } from 'src/composables/schemas'
import VeeInput from '../_atoms/VeeInput.vue'

interface Props {
  user: SetRequired<Partial<User>, 'id'>
}
const props = defineProps<Props>()

defineEmits([...useDialogPluginComponent.emits])

const { dialogRef, onDialogHide, onDialogOK } = useDialogPluginComponent()

const { handleSubmit, meta } = useForm({
  validationSchema: userAssignBadgeSchema,
  initialValues: {
    id: '',
    instructor_id: '',
    notes: '',
  },
})

const { mutate } = useMutation(UpdateUserBadgesDocument)
const onSubmit = handleSubmit(async (values) => {
  await mutate({
    input: {
      id: props.user.id,
      grant: [values],
    },
  })
  onDialogOK()
})
</script>

<script lang="ts">
import { gql } from 'graphql-tag'
import { useMutation } from '@vue/apollo-composable'
gql`
  mutation UpdateUserBadges($input: UpdateUserBadgesInput!) {
    updateUserBadges(input: $input) {
      id
      badges {
        id
        name
        created_at
        updated_at
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
