<template>
  <q-form v-bind="$attrs" @submit.prevent="onSubmit">
    <VQWrap :t-prefix="tPrefix">
      <slot />
    </VQWrap>
  </q-form>
</template>

<script setup lang="ts">
import type { QFormProps } from 'quasar'

interface Props extends QFormProps {
  tPrefix?: string
}
defineProps<Props>()

interface Emits {
  (e: 'submit', ...args: any[]): void
}

const emit = defineEmits<Emits>()

function onSubmit(...rest: any) {
  emit('submit', ...rest)
}
</script>

<style scoped></style>
