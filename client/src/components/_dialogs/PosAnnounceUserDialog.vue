<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card
      class="q-dialog-plugin"
      style="min-width: 600px"
      @click="onCardClick"
    >
      <q-card-section class="text-center text-h6 q-pa-none">
        <div class="q-py-sm">User Card Scanned</div>
        <q-linear-progress
          size="5px"
          :value="value"
          class="q-ma-none"
          color="accent"
          animation-speed="500"
        >
          <div class="absolute-full flex flex-center"></div>
        </q-linear-progress>
      </q-card-section>
      <q-card-section horizontal class="">
        <user-image :user="user" width="200px" />
        <q-card-section class="text-h5">
          {{ user.name }}
        </q-card-section>
      </q-card-section>
      <q-separator />
      <q-card-actions class="row q-pa-none justify-between" align="right">
        <q-btn class="col" size="xl" color="primary">View Account</q-btn>
        <q-btn class="col" size="xl" color="primary">Check In</q-btn>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { useDialogPluginComponent } from 'quasar'
import { useSelfDismiss } from 'src/composables/cards'
import { type User } from 'src/gql/graphql'
import type { SetRequired } from 'type-fest'
import UserImage from '../_molecules/UserImage.vue'

interface Props {
  user: SetRequired<Partial<User>, 'id' | 'name' | 'avatar' | 'email'>
  repeated?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  repeated: false,
})

defineEmits([...useDialogPluginComponent.emits])

const { dialogRef, onDialogHide } = useDialogPluginComponent()
const { value, resume, reset, pause } = useSelfDismiss(15, onDialogHide)
if (!props.repeated) {
  resume()
}

function onCardClick() {
  reset()
  pause()
}
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
