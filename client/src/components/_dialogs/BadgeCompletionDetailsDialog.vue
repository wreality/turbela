<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-spinner v-if="loading || !completion" size="50px" />
    <q-card v-else class="q-dialog-plugin" style="min-width: 600px">
      <q-card-section class="card-header text-center text-h6 q-pa-none">
        <div class="q-py-sm">Badge Completion Details</div>
      </q-card-section>
      <q-card-section class="q-pa-none">
        <q-card-section horizontal>
          <q-card-section class="q-pa-md justify-center column">
            <template v-if="revoked">
              <IconBadge color="red" icon="sym_o_block"> Revoked </IconBadge>
            </template>
            <template v-else>
              <IconBadge color="green" icon="sym_o_check"> Awarded </IconBadge>
            </template>
          </q-card-section>
          <q-separator vertical />
          <q-card-section>
            <div v-if="props.header === 'badge'" class="text-h5">
              {{ result?.user?.badge?.name }}
            </div>
            <div v-if="props.header === 'user'">
              <UserItem size="lg" :user="result?.user?.id as string" />
            </div>

            <div class="row q-gutter-md q-pt-md">
              <DisplayField label="First Completed">
                {{ completion.created_at.toFormat('yyyy-MM-dd') }}
                (<RelativeTime :date-time="completion.created_at" />)
              </DisplayField>
              <DisplayField label="Last Updated">
                {{ completion.updated_at.toFormat('yyyy-MM-dd') }}
                (<RelativeTime :date-time="completion.updated_at" />)
              </DisplayField>
            </div>
          </q-card-section>
        </q-card-section>
      </q-card-section>
      <q-separator />
      <q-card-section class="q-px-sm q-py-xs text-subtitle2">
        Completion History (Latest First)
      </q-card-section>
      <q-card-section class="q-pa-none">
        <q-scroll-area style="height: 400px">
          <div class="column q-gutter-md q-pa-md">
            <div v-for="audit in completion.audits" :key="audit.id">
              <q-card flat>
                <q-card-section horizontal>
                  <q-card-section class="q-pa-none">
                    <div
                      class="text-center full-height column items-center justify-center"
                    >
                      <template v-if="audit.event === 'attachBadge'">
                        <IconBadge outline color="green" icon="sym_o_check">
                          Awarded
                        </IconBadge>
                      </template>
                      <template v-if="audit.event === 'detachBadge'">
                        <IconBadge outline color="red" icon="sym_o_block">
                          Revoked
                        </IconBadge>
                      </template>
                    </div>
                  </q-card-section>
                  <q-card-section class="col q-pa-none">
                    <q-card-section class="column justify-center q-py-xs">
                      <div class="q-pa-sm bg-grey-3">
                        <div
                          v-if="audit.new_values.completion.notes"
                          class="q-pa-xs"
                        >
                          {{ audit.new_values.completion.notes }}
                        </div>
                        <UserItem
                          v-if="audit.new_values.completion?.instructor_id"
                          size="sm"
                          :user="audit.new_values.completion.instructor_id"
                        />
                      </div>
                    </q-card-section>
                  </q-card-section>
                </q-card-section>
              </q-card>
              <div class="text-right text-caption">
                Recorded by
                <template v-if="audit.user">
                  {{ audit.user.name }}
                </template>
                <template v-else>System</template>
                {{ audit.created_at.toFormat('yyyy-MM-dd HH:mm:ss') }}
                (<RelativeTime :date-time="audit.created_at" />)
              </div>
            </div>
          </div>
        </q-scroll-area>
      </q-card-section>
      <q-separator />
      <q-card-actions class="row q-pa-none justify-between" align="right">
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import UserItem from '../User/UserItem.vue'
import RelativeTime from '../_atoms/RelativeTime.vue'
import DisplayField from '../_atoms/DisplayField.vue'
import IconBadge from '../_atoms/IconBadge.vue'
import { useQuery } from '@vue/apollo-composable'
import { DateTime } from 'luxon'
import { computed } from 'vue'
import { useDialogPluginComponent } from 'quasar'
import { UserBadgeDetailsDocument } from 'src/gql/graphql'

interface Props {
  badgeId: string
  userId: string
  header: 'user' | 'badge'
}

const props = defineProps<Props>()

defineEmits([...useDialogPluginComponent.emits])

const { dialogRef, onDialogHide } = useDialogPluginComponent()

const { result, loading } = useQuery(UserBadgeDetailsDocument, () => ({
  badge_id: props.badgeId,
  user_id: props.userId,
}))
const completion = computed(() => {
  const completion = result.value?.user?.badge?.completion

  if (!completion) {
    return
  }

  return {
    ...completion,
    created_at: DateTime.fromISO(completion.created_at),
    updated_at: DateTime.fromISO(completion.updated_at),
    audits: completion.audits.map((audit) => {
      return {
        ...audit,
        created_at: DateTime.fromISO(audit.created_at),
      }
    }),
  }
})
const revoked = computed(() => result.value?.user?.badge?.completion?.revoked)
</script>

<script lang="ts">
import { graphql } from 'src/gql'
graphql(`
  query UserBadgeDetails($user_id: ID!, $badge_id: ID!) {
    user(id: $user_id) {
      id
      name
      email
      badge(id: $badge_id) {
        id
        name
        completion {
          id
          revoked
          created_at
          updated_at
          notes
          instructor {
            ...UserItem
          }
          audits {
            id
            event
            created_at
            user {
              ...UserItem
            }
            new_values {
              completion {
                instructor_id
                notes
              }
            }
          }
        }
      }
    }
  }
`)
</script>
<style lang="scss" scoped>
body.body--dark {
  .q-card .card-header {
    background-color: $indigo-10;
  }
}
body.body--light {
  .q-card .card-header {
    background-color: $blue-3;
  }
}
</style>
