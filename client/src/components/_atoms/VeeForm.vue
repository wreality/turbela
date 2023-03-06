<template>
  <q-form v-bind="$attrs">
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
</script>

<style scoped></style>
