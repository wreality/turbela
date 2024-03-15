<template>
  <q-card flat class="full-width text-center">
    <q-card-section class="q-pa-none">
      <q-icon :name="icon" class="text-grey-5" size="100px" />
    </q-card-section>
    <q-card-section class="q-pa-none">
      <slot name="title">
        <div class="text-h6" v-text="t('title')" />
      </slot>
      <slot name="subtext">
        <div class="" v-text="t('subtext')" />
      </slot>
    </q-card-section>
    <q-card-section v-if="props.onNew || props.to">
      <q-btn color="primary" :to="props.to" @click="$emit('new')">
        {{ t('button') }}
      </q-btn>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router/auto'

interface Props {
  icon: string
  tPrefix?: string
  to?: RouteLocationRaw
  onNew?: () => void
}

const props = withDefaults(defineProps<Props>(), {
  tPrefix: '',
  to: undefined,
  onNew: undefined,
})

defineEmits<{
  new: []
}>()

const { t } = usei18nPrefix(props.tPrefix ?? '')
</script>

<style scoped></style>
