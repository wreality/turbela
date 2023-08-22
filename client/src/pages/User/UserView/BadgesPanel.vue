<template>
  <div>
    <q-list v-if="userBadges.length" bordered separator>
      <q-item v-for="badge in userBadges" :key="badge.id">
        <q-item-section>
          <q-item-label>
            {{ badge.name }}
          </q-item-label>
          <q-item-label caption>
            Granted
            <relative-time
              :date-time="DateTime.fromISO(badge.completion?.created_at)"
            />
          </q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-icon v-if="badge.completion?.notes?.length" name="note" />
        </q-item-section>
      </q-item>
    </q-list>
    <div v-else>This user hasn't been awarded any badges.</div>
    <q-btn @click="assignUserBadge">Grant New Badge</q-btn>
  </div>
</template>

<script setup lang="ts">
import RelativeTime from 'src/components/_atoms/RelativeTime.vue'
import { useQuery } from '@vue/apollo-composable'
import { UserBadge, User, UserBadgesDocument } from 'src/generated/graphql'
import { computed } from 'vue'
import UserBadgeAssignDialog from 'src/components/_dialogs/UserBadgeAssignDialog.vue'
interface Props {
  user: User
}

const p = defineProps<Props>()

const variables = computed(() => ({ id: p.user.id }))
const { result } = useQuery(UserBadgesDocument, variables)

const userBadges = computed(
  () => result.value?.user?.badges ?? ([] as UserBadge[])
)
const { dialog } = useQuasar()
function assignUserBadge() {
  dialog({
    component: UserBadgeAssignDialog,
    componentProps: {
      user: p.user,
    },
  })
}
</script>

<script lang="ts">
import { gql } from 'graphql-tag'
import { useQuasar } from 'quasar'
import { DateTime } from 'luxon'

gql`
  query UserBadges($id: ID!) {
    user(id: $id) {
      id
      badges {
        id
        name
        completion {
          created_at
          notes
        }
      }
    }
  }
`
</script>
