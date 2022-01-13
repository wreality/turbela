<template lang="pug">
q-list(bordered, separator)
  q-item(
    v-for='badge in badges',
    :key='badge.id',
    clickable,
    @click='selectHandler(badge)'
  )
    q-item-section {{ badge.name }}
</template>

<script lang="ts" setup>
import { onKeyStroke } from '@vueuse/core'
import type { Badge } from 'src/generated/graphql'
type PickedBadge = Pick<Badge, 'id' | 'name'>
type Expand<T> = T extends infer O ? { [K in keyof O]: O[K] } : never

type P = Expand<PickedBadge>
interface Props {
  badges: Readonly<Array<PickedBadge>> | Array<PickedBadge>
  loading?: boolean
  total: number
}
const props = withDefaults(defineProps<Props>(), { loading: false })

interface Emits {
  (e: 'select', badge: PickedBadge): void
}
const emit = defineEmits<Emits>()

function selectHandler(badge: PickedBadge) {
  emit('select', badge)
}

onKeyStroke('Enter', () => {
  if (props.badges.length === 1) {
    selectHandler(props.badges[0])
  }
})
</script>

<style lang="scss" scoped></style>
