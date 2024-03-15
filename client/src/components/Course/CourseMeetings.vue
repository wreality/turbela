<template>
  <div v-for="meeting in $props.meetings" :key="meeting.id">
    {{ meeting.start_at?.toLocaleString(DateTime.DATETIME_MED) }} -
    <span
      v-if="meeting.start_at?.startOf('day') == meeting.end_at?.startOf('day')"
    >
      {{ meeting.end_at?.toLocaleString(DateTime.DATE_MED) }}
    </span>
    {{ meeting.end_at?.toLocaleString(DateTime.TIME_SIMPLE) }}
  </div>
</template>

<script setup lang="ts">
import { DateTime } from 'luxon'
import type { CourseSessionMeeting } from 'src/gql/graphql'

interface Props {
  meetings: CourseSessionMeeting[]
}
defineProps<Props>()
</script>

<style scoped></style>
