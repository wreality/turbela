<template>
  <q-card class="user cursor-pointer" @click="clickHandler">
    <transition
      appear
      enter-active-class="animated flipInX animate__slow animate__delay-2s"
    >
      <q-card-section
        v-if="showHeader"
        class="q-pa-none absolute"
        style="z-index: 100; width: 100%"
      >
        <slot name="header"></slot>
      </q-card-section>
    </transition>
    <q-card-section class="text-center badge-card-body">
      <div class="text-bold">{{ badge.name }}</div>
    </q-card-section>
  </q-card>
</template>
<script lang="ts" setup>
import { Badge } from 'src/gql/graphql'

interface Props {
  badge: Badge
  showHeader?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  showHeader: false,
})

const emit = defineEmits<{
  (e: 'select', v: Badge): void
}>()

function clickHandler() {
  emit('select', props.badge)
}
</script>

<style lang="scss" scoped>
.badge-card-body {
  padding-top: 4em;
}
</style>
