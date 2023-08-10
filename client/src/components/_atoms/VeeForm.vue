<template>
  <q-form v-bind="$attrs" @submit.prevent="onSubmit">
    <I18nPrefix :t-prefix="tPrefix">
      <slot />
    </I18nPrefix>
  </q-form>
</template>

<script setup lang="ts">
import { QFormProps } from 'quasar'
import I18nPrefix from './i18nPrefix.vue'

interface Props extends QFormProps {
  tPrefix?: string
}
defineProps<Props>()

interface Emits {
  (e: 'submit', ...args: any[]): void
}

const emit = defineEmits<Emits>()

function onSubmit(...rest: any) {
  console.log('localEmit')
  emit('submit', ...rest)
}
</script>

<style scoped></style>
