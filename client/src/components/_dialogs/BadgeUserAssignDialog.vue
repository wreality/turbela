<template>
  <q-dialog ref="dialogRef" v-model="show" @hide="hideEvent">
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
import type { UpdateBadgeUsersInput } from 'src/gql/graphql'
import type { RouteLocationRaw } from 'vue-router/auto'

interface Props {
  badgeId: string
  dismissRoute: RouteLocationRaw
}
const props = defineProps<Props>()

defineEmits([...useDialogPluginComponent.emits])

const { dialogRef, onDialogOK, onDialogHide } = useDialogPluginComponent()

const show = ref(true)

const { handleSubmit, meta } = useForm({
  validationSchema: assignUsersSchema,
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
const { push } = useRouter()

function hideEvent() {
  onDialogHide()
  push(props.dismissRoute)
}
</script>

<script lang="ts">
graphql(`
  mutation UpdateBadgeUsers($input: UpdateBadgeUsersInput!) {
    badge {
      updateBadgeUsers(input: $input) {
        id
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
