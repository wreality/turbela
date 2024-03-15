<template>
  <q-card flat>
    <q-card-section>
      <ul v-if="course">
        <li v-for="session in course.sessions" :key="session.id">
          Session {{ session.id }}
          <CourseMeetings :meetings="session.meetings" />
        </li>
      </ul>
      {{ course }}
      {{ error }}
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
interface Props {
  id: string
}

const props = defineProps<Props>()

const { set: setTag } = useScope()

const { result, error } = useQuery(CourseDocument, props)
const course = computed(() => result.value?.course ?? null)

const name = computed(() => result.value?.course?.name ?? 'Loading...')
setTag({ courseName: name })
</script>

<script lang="ts">
graphql(`
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
`)
</script>

<style scoped></style>
