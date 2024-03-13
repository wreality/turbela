<template>
  <slot v-if="isVisible" />
</template>

<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router/auto'

interface Props {
  to?: RouteLocationRaw
  ability?: string | string[]
}
const props = defineProps<Props>()

const { canAccessRoute } = useNavigation()
const { can } = useCurrentUser()

const isVisible = computed(() =>
  props.to ? canAccessRoute(props.to) : can(props.ability)
)
</script>

<style scoped></style>
