<template>
  <div>
    <q-card flat>
      <div class="column q-gutter-md">
        <div v-if="u">
          <div class="section-title">Contact Information</div>
          <div v-if="!loading && user" class="column q-gutter-lg">
            <DisplayField label="Name" :value="u.name" />
            <DisplayField
              label="Preferred Name"
              :value="u.preferred_name ?? void 0"
            />
            <DisplayField label="Email">
              {{ u.email }}
              <q-badge v-if="u.email_verified_at" color="green">
                Verified
              </q-badge>
              <q-badge v-else color="red">Unverified</q-badge>
            </DisplayField>

            <DisplayField label="Address">
              <div v-if="u.address">
                <div>{{ u.address.line1 }}</div>
                <div v-if="u.address.line2">
                  {{ u.address.line2 }}
                </div>
                {{ u.address.city }}, {{ u.address.state }}
                {{ u.address.postal_code }}
              </div>
              <q-badge v-else>No Address Entered</q-badge>
            </DisplayField>
          </div>
        </div>
        <div class="section-title">Emergency Contacts</div>
      </div>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import type { User } from 'src/gql/graphql'

interface Props {
  user: User
}

const props = defineProps<Props>()

const { result, loading } = useQuery(UserProfileDocument, () => props.user)

const u = computed(() => result.value?.user)
</script>

<script lang="ts">
graphql(`
  query UserProfile($id: ID) {
    user(id: $id) {
      id
      email
      email_verified_at
      name
      preferred_name
      address {
        line1
        line2
        city
        state
        postal_code
      }
      name
    }
  }
`)
</script>

<style scoped lang="scss">
.section-title {
  font-weight: bold;
  border-bottom: 1px solid $grey-5;
  margin-bottom: 1.5em;
  padding-bottom: 0.5em;
  text-transform: uppercase;
}
</style>
