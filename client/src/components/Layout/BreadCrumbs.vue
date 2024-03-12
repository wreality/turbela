<template>
  <q-breadcrumbs>
    <template #separator>
      <q-icon size="1.5em" name="chevron_right" color="primary"></q-icon>
    </template>
    <q-breadcrumbs-el
      v-for="(crumb, idx) in crumbs.slice(0, -1)"
      v-bind="crumb"
      :key="`crumb${idx}`"
      :label="crumb.label.value"
    />
    <q-breadcrumbs-el v-bind="omit(last, 'to')" :label="last.label.value" />
  </q-breadcrumbs>
</template>

<script setup lang="ts">
import { omit } from 'lodash'

const { crumbs } = useCrumbs()

const last = computed(() => crumbs.value.slice(-1)[0])
</script>
