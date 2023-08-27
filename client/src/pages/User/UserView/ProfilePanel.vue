<template>
  <div>
    <q-card flat>
      <div class="column q-gutter-md">
        <div>
          <div class="section-title">Contact Information</div>
          <div v-if="!loading && user" class="column q-gutter-lg">
            <DisplayField label="Name" :value="user.name" />
            <DisplayField
              label="Preferred Name"
              :value="user.preferred_name ?? void 0"
            />
            <DisplayField label="Email">
              {{ user.email }}
              <q-badge v-if="user.email_verified_at" color="green"
                >Verified</q-badge
              ><q-badge v-else color="red">Unverified</q-badge>
            </DisplayField>

            <DisplayField label="Address">
              <div v-if="user.address">
                <div>{{ user.address.line1 }}</div>
                <div v-if="user.address.line2">
                  {{ user.address.line2 }}
                </div>
                {{ user.address.city }}, {{ user.address.state }}
                {{ user.address.postal_code }}
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
import DisplayField from 'src/components/_atoms/DisplayField.vue'
import { User } from 'src/generated/graphql'
import { UserProfileDocument } from 'src/generated/graphql'
interface Props {
  user: User
}

const props = defineProps<Props>()

const { result, loading } = useQuery(UserProfileDocument, () => props.user)

const user = computed(() => result.value?.user)
</script>

<script lang="ts">
import { gql } from 'graphql-tag'
import { useQuery } from '@vue/apollo-composable'
import { computed } from 'vue'

gql`
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
`
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
