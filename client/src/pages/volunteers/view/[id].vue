<template>
  <div v-if="user">
    <div class="bg-deep-orange-5 text-white row">
      <div class="offset-md-2 col-md-10 q-my-md">
        <div class="text-h4 text-weight-medium">
          {{ user.name }}
          <q-btn
            label="Customer"
            :to="{ name: 'users:view', params: { id: user.id } }"
          />
        </div>
        <div class="text-subtitle2">{{ user.email }}</div>
      </div>
    </div>
    <div class="bg-deep-orange-8 text-white row">
      <q-tabs
        dense
        class="offset-md-2"
        indicator-color="deep-orange-11"
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
          icon="account_box"
          label="Customer"
          :to="{ name: 'users:view', params: { id: user.id } }"
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
definePage({
  name: 'volunteers:view',
  meta: {
    crumb: {
      label: 'Details',
    },
  },
})
const route = useRoute('volunteers:view')

const { childrenOf } = useNavigation()

const tabs = childrenOf({ name: 'volunteers:view', params: route.params }, -1)

const { result } = useQuery(VolunteerViewDocument, route.params)

const user = computed(() => result.value?.volunteer?.user)

setCrumbLabel(
  'volunteers:view',
  computed(() => user.value?.name)
)
</script>

<script lang="ts">
graphql(`
  query VolunteerView($id: ID!) {
    volunteer(id: $id) {
      id
      user {
        id
        name
        email
        ...UserImage
      }
    }
  }
`)
</script>
<style scoped></style>
