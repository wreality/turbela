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
          v-for="tab in tabs"
          :key="tab.name"
          :to="tab.to"
          :label="tab.label"
          :icon="tab.icon"
          exact
        />

        <q-route-tab
          v-if="user.is_volunteer"
          icon="volunteer_activism"
          label="Volunteer"
          :to="`/volunteers/${user.id}`"
        />
      </q-tabs>
    </div>

    <div v-if="user" class="row q-gutter-sm justify-left">
      <div class="col-2 relative-position">
        <div class="column items-center" style="position: relative; top: -95px">
          <UserAvatar rounded size="150px" :user="user" />
        </div>
      </div>
      <div class="col">
        <div class="column">
          <div>
            <q-card flat>
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
import PosAssignUserLocatorDialog from 'components/_dialogs/PosAssignUserLocatorDialog.vue'
import type { SerialListenerCB } from 'src/composables/terminal'
import type { User } from 'src/gql/graphql'

definePage({
  name: 'users:view',
  meta: {
    requiresAbility: 'view:User',
    crumb: { label: 'User Details', icon: 'person' },
    navigation: {
      icon: 'person',
      label: 'Profile',
    },
  },
})

const route = useRoute('/users/[id]/')

const { childrenOf } = useNavigation()
const tabs = childrenOf('/users/[id]/')

const { result } = useQuery(UserViewDocument, route.params)

const user = computed(() => result.value?.user as User)
const userName = computed(() => user.value?.name)

const { set: setScope } = useScope()
setScope({ userName: userName })

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
graphql(`
  query UserView($id: ID, $email: String) {
    user(id: $id, email: $email) {
      email
      name
      id
      is_volunteer
      subscription {
        id
        stripe_status
      }
      ...UserImage
    }
  }
`)
</script>
