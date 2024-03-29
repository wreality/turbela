<template>
  <q-dialog ref="dialogRef" v-model="show" @hide="hideEvent">
    <q-card
      v-if="completion && !loading"
      class="q-dialog-plugin"
      style="min-width: 600px"
    >
      <q-card-section class="card-header text-center text-h6 q-pa-none">
        <div class="q-py-sm">Badge Completion Details</div>
      </q-card-section>
      <q-card-section class="q-pa-none">
        <q-card-section horizontal>
          <q-card-section class="q-pa-md justify-center column">
            <template v-if="revoked">
              <IconBadge color="red" icon="sym_o_block">Revoked</IconBadge>
            </template>
            <template v-else>
              <IconBadge color="green" icon="sym_o_check">Awarded</IconBadge>
            </template>
          </q-card-section>
          <q-separator vertical />
          <q-card-section>
            <div v-if="props.header === 'badge'" class="text-h5">
              {{ completion?.badge?.name }}
            </div>
            <div v-if="props.header === 'user'">
              <q-btn
                label="View Customer"
                size="sm"
                class="float-right"
                @click="gotoUser"
              />
              <UserItem
                class="col"
                size="lg"
                :user="completion?.user?.id as string"
              />
            </div>

            <div class="row q-gutter-md q-pt-md">
              <DisplayField label="First Completed">
                {{ completion.created_at.toFormat('yyyy-MM-dd') }}
                (
                <RelativeTime :date-time="completion.created_at" />
                )
              </DisplayField>
              <DisplayField label="Last Updated">
                {{ completion.updated_at.toFormat('yyyy-MM-dd') }}
                (
                <RelativeTime :date-time="completion.updated_at" />
                )
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
                (
                <RelativeTime :date-time="audit.created_at" />
                )
              </div>
            </div>
          </div>
        </q-scroll-area>
      </q-card-section>
      <q-separator />
      <q-card-actions
        class="row q-pa-none justify-between"
        align="right"
      ></q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import type { BadgeCompletion } from 'src/gql/graphql'
import type { RouteLocationRaw } from 'vue-router/auto'

interface Props {
  completion?: BadgeCompletion
  loading?: boolean
  dismissRoute: RouteLocationRaw
  header: 'user' | 'badge'
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
  completion: undefined,
})

const { dialogRef, onDialogHide } = useDialogPluginComponent()
defineEmits([...useDialogPluginComponent.emits])

function hideEvent() {
  onDialogHide()
  push(props.dismissRoute)
}

const revoked = computed(() => props.completion?.revoked)
const show = ref(true)
const { push } = useRouter()
function gotoUser() {
  onDialogHide()
  push({
    name: 'users:view',
    params: { id: props.completion?.user?.id as string },
  })
}
</script>

<script lang="ts">
graphql(`
  fragment BadgeCompletionDetails on BadgeCompletion {
    id
    revoked
    created_at
    updated_at
    notes
    instructor {
      ...UserItem
    }
    user {
      ...UserItem
    }
    badge {
      name
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
