<template>
  <q-list bordered separator>
    <q-item
      v-for="badge in badges"
      :key="badge.id"
      clickable
      @click="onItemClick(badge)"
    >
      <q-item-section>{{ badge.name }}</q-item-section>
    </q-item>
  </q-list>
</template>

<script lang="ts" setup>
import type { Badge } from 'src/gql/graphql'

interface Props {
  badges: Badge[]
  loading?: boolean
  total: number
}
const props = withDefaults(defineProps<Props>(), { loading: false })

interface Emits {
  (e: 'select', badge: Badge): void
}
const emit = defineEmits<Emits>()

function onItemClick(badge: Badge) {
  emit('select', badge)
}

onKeyStroke('Enter', () => {
  if (props.badges.length === 1) {
    onItemClick(props.badges[0])
  }
})
</script>

<style lang="scss" scoped></style>
