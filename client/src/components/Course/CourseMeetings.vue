<template>
  <div v-for="meeting in mapMeetings" :key="meeting.id">
    {{ meeting.start_at.toLocaleString(DateTime.DATETIME_MED) }} -
    <span
      v-if="meeting.start_at.startOf('day') == meeting.end_at.startOf('day')"
    >
      {{ meeting.end_at.toLocaleString(DateTime.DATE_MED) }}</span
    >
    {{ meeting.end_at.toLocaleString(DateTime.TIME_SIMPLE) }}
  </div>
</template>

<script setup lang="ts">
import { DateTime } from 'luxon'
import { CourseSessionMeeting } from 'src/generated/graphql'
import { computed } from 'vue'

interface Props {
  meetings: CourseSessionMeeting[]
}
const props = defineProps<Props>()

const mapMeetings = computed(() =>
  props.meetings.map((m) => ({
    ...m,
    start_at: DateTime.fromISO(m.start_at),
    end_at: DateTime.fromISO(m.end_at),
  }))
)
</script>

<style scoped></style>
