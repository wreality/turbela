<template>
  <q-card flat>
    <q-card-section>
      <ul v-if="course">
        <li v-for="session in course.sessions" :key="session.id">
          Session {{ session.id
          }}<CourseMeetings :meetings="session.meetings" />
        </li>
      </ul>
      {{ course }}
      {{ error }}
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { useQuery } from '@vue/apollo-composable'
import CourseMeetings from 'src/components/Course/CourseMeetings.vue'
import { useBreadcrumbTags } from 'src/composables/breadcrumbs'
import { CourseDocument } from 'src/generated/graphql'
import { computed } from 'vue'
interface Props {
  id: string
}

const props = defineProps<Props>()

const { setTag } = useBreadcrumbTags()

const { result, error } = useQuery(CourseDocument, props)
const course = computed(() => result.value?.course ?? null)

const name = computed(() => result.value?.course?.name ?? 'Loading...')
setTag('#name', name)
</script>

<script lang="ts">
import { gql } from 'graphql-tag'
gql`
  query Course($id: ID!) {
    course(id: $id) {
      id
      name
      sessions {
        id
        publish_at
        meetings {
          id
          start_at
          end_at
        }
      }
    }
  }
`
</script>

<style scoped></style>
