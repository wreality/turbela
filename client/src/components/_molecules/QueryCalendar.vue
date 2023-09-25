<template>
  <div>
    <FullCalendar ref="fullCalendarRef" :options="calendarOptions">
      <template
        v-for="(_, slotName) in slots"
        #[slotName]="//@ts-ignore
    data"
      >
        <slot :name="slotName" v-bind="data"></slot>
      </template>
    </FullCalendar>
  </div>
</template>

<script setup lang="ts">
import FullCalendar from '@fullcalendar/vue3'
import type { CalendarOptions } from '@fullcalendar/core'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import { DateTime } from 'luxon'
import { useApolloClient } from '@vue/apollo-composable'
import { ref, useSlots } from 'vue'
import { DocumentNode } from 'graphql'

const props = withDefaults(
  defineProps<{
    query: DocumentNode
    field?: string
    variables?: Record<string, any>
    mapCb: (data: any) => any
  }>(),
  {
    field: '',
    variables: () => ({}),
  }
)

const slots = useSlots()

const fullCalendarRef = ref<typeof FullCalendar | null>(null)

const { resolveClient } = useApolloClient()
const client = resolveClient()

function getField(result: any) {
  if (!result) {
    return null
  }
  if (!props.field) {
    return result.data[Object.keys(result)[0]]
  }

  return props.field.split('.').reduce((o, i) => o[i], result.data)
}

const fetchEvents: CalendarOptions['events'] = async ({
  startStr,
  endStr,
}: {
  startStr: string
  endStr: string
}) => {
  const result = await client.query({
    query: props.query,
    variables: {
      ...props.variables,
      input: {
        start: DateTime.fromISO(startStr)
          .startOf('day')
          .toISO({ suppressMilliseconds: true }),
        end: DateTime.fromISO(endStr)
          .endOf('day')
          .startOf('second')
          .toISO({ suppressMilliseconds: true }),
      },
      page: 1,
      first: 100,
    },
  })

  const hours = getField(result)?.data ?? []

  return hours.map(props.mapCb)
}

const calendarOptions = ref<CalendarOptions>({
  plugins: [dayGridPlugin, timeGridPlugin],
  initialView: 'dayGridMonth',
  events: fetchEvents,
  headerToolbar: {
    left: 'prev,next',
    center: 'title',
    right: 'timeGridDay,timeGridWeek,dayGridMonth,dayGridYear', // user can switch between the two
  },
})
</script>

<style scoped></style>
