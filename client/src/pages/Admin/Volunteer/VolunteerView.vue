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
          icon="home"
          :to="{
            name: 'admin:volunteer:view',
            params: { id: user.id },
          }"
          label="Dashboard"
          exact
        />
        <q-route-tab
          icon="hourglass_empty"
          :to="{
            name: 'admin:volunteer:approval',
            params: { id: user.id },
          }"
          label="Approval"
          exact
        />
        <q-route-tab
          icon="history"
          :to="{ name: 'admin:users:badges', params: { id: user.id } }"
          label="Hour History"
          exact
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
import UserAvatar from 'src/components/User/UserAvatar.vue'
import { useQuery } from '@vue/apollo-composable'
import { computed } from 'vue'
import { useScope } from 'src/composables/breadcrumbs'
import { VolunteerViewDocument } from 'src/generated/graphql'
interface Props {
  id: string
}

const props = defineProps<Props>()

const { result } = useQuery(VolunteerViewDocument, props)

const volunteerName = computed(() => result.value?.volunteer?.user?.name)
const user = computed(() => result.value?.volunteer?.user)
const { set: setScope } = useScope()
setScope({ volunteerName })
</script>

<script lang="ts">
import { gql } from 'graphql-tag'

gql`
  query VolunteerView($id: ID!) {
    volunteer(id: $id) {
      id
      user {
        id
        name
        email
      }
    }
  }
`
</script>
<style scoped></style>
