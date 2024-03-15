<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="q-dialog-plugin">
      <q-card-section class="bg-blue-2 text-center text-h5 q-pb-none">
        <div class="text-caption">Unknown RFID</div>
        <div>{{ tokenNumber }} {{ split }}</div>
      </q-card-section>
      <q-card-section class="q-mt-md">
        The card just scanned is unassigned. Would you like to assign it to this
        user?
      </q-card-section>
      <q-card-actions align="right">
        <q-btn
          :color="saved ? 'positive' : 'primary'"
          label="Assign"
          :loading="loading || saved"
          :percentage="progressValue"
          @click="onOKClick"
        >
          <template #loading>
            <q-icon name="check" />
          </template>
        </q-btn>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import type { User } from 'src/gql/graphql'
import type { SetRequired } from 'type-fest'

interface Props {
  user: SetRequired<Partial<User>, 'id' | 'name'>
  token: string
}
const props = defineProps<Props>()

const { counter, resume } = useInterval(150, {
  controls: true,
  immediate: false,
})

const progressValue = computed(() => Math.min(counter.value * 5, 110))
watch(progressValue, async (newValue: number) => {
  if (newValue >= 110) {
    await nextTick()
    onDialogOK()
  }
})
const saved = ref(false)
const tokenNumber = computed(() => parseInt(props.token))
const split = computed(
  () =>
    ((tokenNumber.value >> 16) & 0xffff).toString().padStart(3, '0') +
    ':' +
    (tokenNumber.value & 0xffff).toString().padStart(5, '0')
)
defineEmits([...useDialogPluginComponent.emits])

const { dialogRef, onDialogHide, onDialogOK } = useDialogPluginComponent()

const { mutate, loading } = useMutation(CreateUserLocatorDocument)

async function onOKClick() {
  if (!saved.value) {
    const result = await mutate({ id: props.user.id, token: props.token })

    if (result?.data?.createLocator?.id === null) {
      return
    }
    saved.value = true
    resume()
  } else {
    onDialogOK()
  }
}
</script>

<script lang="ts">
graphql(`
  mutation CreateUserLocator($token: String!, $id: ID!) {
    createLocator(
      input: {
        token: $token
        type: RFID
        target: { connect: { id: $id, type: USER } }
      }
    ) {
      id
    }
  }
`)
</script>
