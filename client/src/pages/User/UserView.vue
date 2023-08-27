<template>
  <div v-if="user">
    <div class="bg-deep-purple-5 text-white row">
      <div class="offset-md-2 col-md-10 q-my-md">
        <div class="text-h4 text-weight-medium">
          {{ user.name }}
        </div>
        <div class="text-subtitle2">{{ user.email }}</div>
      </div>
    </div>
    <div class="bg-deep-purple-8 text-white row">
      <q-tabs
        dense
        class="offset-md-2"
        indicator-color="deep-purple-11"
        switch-indicator
      >
        <q-route-tab
          icon="person"
          :to="{
            name: 'admin:users:view',
            params: { id: user.id },
          }"
          label="Profile"
          exact
        />
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
          icon="sym_o_award_star"
          :to="{ name: 'admin:users:badges', params: { id: user.id } }"
          label="Badges"
          exact
        />
        <q-route-tab
          icon="money"
          :to="{ name: 'admin:users:invoices', id: user.id }"
          label="Invoices"
          exact
        />
      </q-tabs>
    </div>

    <div v-if="user" class="row q-gutter-sm justify-left">
      <div class="col-2 relative-position">
        <div class="column items-center" style="position: relative; top: -95px">
          <UserAvatar round size="150px" :user="user" />
        </div>
      </div>
      <div class="col">
        <div class="column">
          <div>
            <q-card flat>
              <q-card-section>
                <router-view v-slot="{ Component }" :user="user">
                  <ProfilePanel v-if="!Component" :user="user" />
                  <component :is="Component">
                    {{ Component }}
                  </component>
                </router-view>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import PosAssignUserLocatorDialog from 'components/_dialogs/PosAssignUserLocatorDialog.vue'
import ProfilePanel from './UserView/ProfilePanel.vue'
import UserAvatar from 'src/components/User/UserAvatar.vue'
import { useQuery } from '@vue/apollo-composable'
import { useQuasar } from 'quasar'
import { SerialListenerCB, useTerminalScanner } from 'src/composables/terminal'
import { User, UserViewDocument } from 'src/generated/graphql'
import { computed, onUnmounted } from 'vue'

interface Props {
  id: string
}
const props = defineProps<Props>()

const { result } = useQuery(UserViewDocument, props)
const user = computed(() => result.value?.user as User)

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
  if (lookup) {
    return
  }
  return awaitDialog()
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
