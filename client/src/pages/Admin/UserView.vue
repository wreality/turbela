<template>
  <div>
    <div class="q-mb-md">
      <q-btn class="bg-white" label="Back to search" to="/admin/users" />
    </div>
    <div v-if="user" class="row q-gutter-md justify-left">
      <div>
        <div class="column">
          <q-btn
            :to="{
              name: 'admin:users:photo',
              params: { id: user.id },
            }"
            label="Capture new Image"
          />
          <UserCard :user="user as User" />
        </div>
      </div>
      <div class="col">
        <div class="column">
          <q-tabs class="bg-white">
            <q-route-tab
              icon="badge"
              :to="{
                name: 'admin:users:subscription',
                params: { id: user.id },
              }"
              label="Membership"
              exact
            />
            <q-route-tab
              icon="money"
              :to="{ name: 'admin:users:invoices', id: user.id }"
              label="Invoices"
              exact
            />
            <q-route-tab icon="alarm" to="/alarms" exact />
          </q-tabs>
          <div>
            <q-card>
              <q-card-section>
                <router-view :user="user" />
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import PosAssignUserLocatorDialog from 'src/components/dialogs/PosAssignUserLocatorDialog.vue'
import UserCard from 'components/UserCard.vue'

import { useQuery } from '@vue/apollo-composable'
import { QBtn, useQuasar } from 'quasar'
import { User, UserViewDocument } from 'src/generated/graphql'
import { computed, onUnmounted } from 'vue'
import { SerialListenerCB, useTerminalScanner } from 'src/composables/terminal'

interface Props {
  id: string
}
const props = defineProps<Props>()

const { result } = useQuery(UserViewDocument, props)
const user = computed(() => result.value?.user)

const { dialog } = useQuasar()
const cardScanned: SerialListenerCB = async (_, token, lookup) => {
  async function awaitDialog() {
    return new Promise<true | void>((resolve) => {
      dialog({
        component: PosAssignUserLocatorDialog,
        componentProps: {
          user: user.value,
          token,
        },
      })
        .onOk(() => resolve(true))
        .onCancel(() => resolve())
        .onDismiss(() => resolve())
    })
  }
  !lookup && awaitDialog()
}

onUnmounted(useTerminalScanner('RFID', cardScanned))
</script>

<script lang="ts">
import { gql } from 'graphql-tag'
gql`
  query UserView($id: ID, $email: String) {
    user(id: $id, email: $email) {
      email
      name
      id
      subscription {
        id
        stripe_status
      }
    }
  }
`
</script>

<style lang="scss" scoped></style>
