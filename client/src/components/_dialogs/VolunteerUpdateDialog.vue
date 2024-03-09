<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="q-dialog-plugin" style="min-width: 600px">
      <q-card-section class="text-center text-h6 q-pa-none">
        <div class="q-py-sm">Activate Volunteer</div>
      </q-card-section>
      <q-card-section>
        <VeeForm t-prefix="volunteers.activeUsers" class="q-gutter-md q-pa-md">
          <UserSelect
            name="user"
            :variables="{ volunteer: { canActivate: true } }"
          />
        </VeeForm>
      </q-card-section>
      <q-separator />
      <q-card-actions class="row q-pa-none justify-between" align="right">
        <q-btn
          class="col"
          size="xl"
          color="primary"
          :loading="meta.pending"
          :disabled="!meta.valid"
          @click="onSubmit"
        >
          Activate Volunteer Account
        </q-btn>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import UserSelect from '../_atoms/UserSelect.vue'
import VeeForm from '../_atoms/VeeForm.vue'
import { useDialogPluginComponent } from 'quasar'
import { UpdateVolunteerActivationDocument } from 'src/gql/graphql'
import { activateSchema } from 'src/composables/schemas/volunteer'
interface Props {
  userId?: string
}
defineProps<Props>()

defineEmits([...useDialogPluginComponent.emits])

const { dialogRef, onDialogHide, onDialogOK } = useDialogPluginComponent()

const { meta, handleSubmit } = useForm({
  validationSchema: activateSchema,
})
const { mutate } = useMutation(UpdateVolunteerActivationDocument)
const onSubmit = handleSubmit(async (values) => {
  const result = await mutate({
    input: {
      id: values.user.id,
      active: true,
    },
  })
  if (result?.data?.volunteer?.updateVolunteer?.id) {
    onDialogOK(result?.data.volunteer.updateVolunteer)
  }
})
</script>

<script lang="ts">
import { graphql } from 'src/gql'
import { useForm } from 'vee-validate'
import { useMutation } from '@vue/apollo-composable'
graphql(`
  mutation UpdateVolunteerActivation($input: VolunteerUpdateInput!) {
    volunteer {
      updateVolunteer(input: $input) {
        id
        active
      }
    }
  }
`)
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
