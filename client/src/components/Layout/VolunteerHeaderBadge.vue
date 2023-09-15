<template>
  <q-btn v-if="user?.volunteer?.active" flat icon="punch_clock">
    <q-badge
      v-if="user?.volunteer?.current_hour?.start"
      color="warning"
      floating
      rounded
    >
      <q-icon name="av_timer" size="xs" />
    </q-badge>
    <q-menu>
      <q-card>
        <q-card-section class="bg-blue-2 q-pa-sm">
          <div class="text-h6">Volunteer Clock</div>
        </q-card-section>
        <q-card-section>
          <q-time v-model="time" flat landscape />
          {{ time }}
        </q-card-section>
        <q-card-section>
          <div class="column">
            <q-btn color="green" label="Clock In" />
          </div>
        </q-card-section>
      </q-card>
    </q-menu>
  </q-btn>
</template>

<script setup lang="ts">
import { ResultOf } from '@graphql-typed-document-node/core'
import { graphql } from 'src/gql'
import { ref } from 'vue'
import { DateTime } from 'luxon'
const Fragment = graphql(`
  fragment VolunteerHeaderBadge on User {
    volunteer {
      active
      current_hour {
        start
      }
    }
  }
`)

interface Props {
  user: ResultOf<typeof Fragment>
}

defineProps<Props>()

const time = ref(DateTime.now().toFormat('HH:mm'))
</script>

<style scoped></style>
