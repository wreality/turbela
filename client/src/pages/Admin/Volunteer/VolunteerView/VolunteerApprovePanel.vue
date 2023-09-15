<template>
  <div>
    <query-calendar
      :query="Query"
      :variables="variables"
      :map-cb="eventMapper"
      field="volunteer.hours"
    />
  </div>
</template>

<script setup lang="ts">
import QueryCalendar from 'src/components/_molecules/QueryCalendar.vue'
import { User, VolunteerHoursOrderByColumn, SortOrder } from 'src/gql/graphql'
import { graphql } from 'src/gql'
import { computed } from 'vue'

const props = defineProps<{
  user: User
}>()

const variables = computed(() => {
  return {
    id: props.user.id,
    orderBy: [
      { column: VolunteerHoursOrderByColumn.Start, order: SortOrder.Asc },
    ],
  }
})

const Query = graphql(`
  query VolunteerCalendar(
    $id: ID!
    $page: Int!
    $first: Int!
    $orderBy: [VolunteerHoursOrderByOrderByClause!]
    $input: VolunteerHoursInput
  ) {
    volunteer(id: $id) {
      id
      hours(first: $first, page: $page, input: $input, orderBy: $orderBy) {
        paginatorInfo {
          ...Paginator
        }
        data {
          id
          start
          end
          length
          approved
          supervisor {
            ...UserItem
          }
        }
      }
    }
  }
`)
const eventMapper = (hour: any) => ({
  id: hour.id,
  title: `${(hour.length ?? 0) / 10} hours`,
  start: hour.start,
  end: hour.end,
  extendedProps: {
    approved: hour.approved,
    length: hour.length,
  },
})
</script>

<style scoped></style>
