<template>
  <div>
    <query-calendar
      :query="Query"
      :variables="variables"
      :map-cb="eventMapper"
      field="volunteer.hours"
    ></query-calendar>
  </div>
</template>

<script setup lang="ts">
import type { User } from 'src/gql/graphql'

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
    $range: VolunteerHoursRangeInput
    $scope: VolunteerHoursScopesInput
  ) {
    volunteer(id: $id) {
      id
      hours(
        first: $first
        page: $page
        scope: $scope
        range: $range
        orderBy: $orderBy
      ) {
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
