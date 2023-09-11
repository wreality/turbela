<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="q-dialog-plugin" style="min-width: 600px">
      <q-card-section class="text-center text-h6 q-pa-none">
        <div class="q-py-sm">{{ $t(`${tPrefix}.header`) }}</div>
      </q-card-section>
      <q-card-section>
        <VeeForm
          :t-prefix="tPrefix"
          class="q-gutter-md q-pa-md"
          @submit="onSubmit"
        >
          <VeeField v-if="props.badge" name="badge_id">
            <template #prepend>
              <q-icon name="sym_o_trophy" />
            </template>
            <template #control>
              {{ props.badge.name }}
            </template>
          </VeeField>
          <BadgeSelect v-else name="badge_id" />
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
          {{ $t(`${tPrefix}.header`) }}
        </q-btn>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import UserSelect from '../_atoms/UserSelect.vue'
import BadgeSelect from '../_atoms/BadgeSelect.vue'
import VeeForm from '../_atoms/VeeForm.vue'
import { useDialogPluginComponent } from 'quasar'
import {
  Badge,
  UpdateUserBadgesDocument,
  UpdateUserBadgesInput,
  User,
} from 'src/generated/graphql'
import { useForm } from 'vee-validate'
import { assignBadgeSchema } from 'src/composables/schemas/badge'
import VeeInput from '../_atoms/VeeInput.vue'

interface Props {
  user: Pick<User, 'id'>
  badge?: Pick<Badge, 'id' | 'name'> | null
  revoke?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  revoke: false,
  badge: null,
})

defineEmits([...useDialogPluginComponent.emits])

const { dialogRef, onDialogHide, onDialogOK } = useDialogPluginComponent()

const { handleSubmit, meta } = useForm({
  validationSchema: assignBadgeSchema,
  initialValues: {
    badge_id: props.badge?.id ?? null,
    instructor_id: null as Record<string, any> | null,
    notes: '',
  },
})

const tPrefix = computed(
  () => `users.${props.revoke ? 'revokeBadge' : 'assignBadge'}`
)

const { mutate } = useMutation(UpdateUserBadgesDocument)
const onSubmit = handleSubmit(async (values) => {
  const input = {
    id: props.user.id,
    [props.revoke ? 'revoke' : 'grant']: [
      {
        badge_id: values.badge_id,
        instructor_id: values.instructor_id?.id,
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

<script lang="ts">
import { gql } from 'graphql-tag'
import { useMutation } from '@vue/apollo-composable'
import { computed } from 'vue'
import VeeField from '../_atoms/VeeField.vue'
gql`
  mutation UpdateUserBadges($input: UpdateUserBadgesInput!) {
    badge {
      updateUserBadges(input: $input) {
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
