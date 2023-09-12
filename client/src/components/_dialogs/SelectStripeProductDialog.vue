<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="q-dialog-plugin">
      <q-card-section>
        <q-select
          v-model="newProductId"
          class="full-width"
          filled
          label="Stripe Product Id"
          :options="options"
          style="width: 250px"
          emit-value
        />
        {{ newProductId }}
      </q-card-section>

      <!--
          ...content
          ... use q-card-section for it?
        -->

      <!-- buttons example -->
      <q-card-actions align="right">
        <q-btn color="primary" label="OK" @click="onOKClick" />
        <q-btn color="primary" label="Cancel" @click="onDialogCancel" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { useQuery } from '@vue/apollo-composable'
import { GetStripeProductsDocument } from 'src/gql/graphql'
import { useDialogPluginComponent } from 'quasar'

const { result } = useQuery(GetStripeProductsDocument)
const newProductId = ref(null)
const availableProducts = computed(
  () => result.value?.getAvailableStripeProducts ?? []
)
const options = computed(() =>
  availableProducts.value.map((i) => ({ label: i.name, value: i.id }))
)

defineEmits([
  // REQUIRED; need to specify some events that your
  // component will emit through useDialogPluginComponent()
  ...useDialogPluginComponent.emits,
])

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
  useDialogPluginComponent()
// dialogRef      - Vue ref to be applied to QDialog
// onDialogHide   - Function to be used as handler for @hide on QDialog
// onDialogOK     - Function to call to settle dialog with "ok" outcome
//                    example: onDialogOK() - no payload
//                    example: onDialogOK({ /*...*/ }) - with payload
// onDialogCancel - Function to call to settle dialog with "cancel" outcome

// this is part of our example (so not required)
function onOKClick() {
  // on OK, it is REQUIRED to
  // call onDialogOK (with optional payload)
  if (newProductId.value) {
    onDialogOK({ stripe_id: newProductId.value })
  } else {
    onDialogOK()
  }
  // or with payload: onDialogOK({ ... })
  // ...and it will also hide the dialog automatically
}
</script>

<script lang="ts">
import { graphql } from 'src/gql'
import { computed, ref } from 'vue'
graphql(`
  query GetStripeProducts {
    getAvailableStripeProducts {
      name
      id
    }
  }
`)
</script>
