<template>
  <q-breadcrumbs>
    <template #separator>
      <q-icon size="1.5em" name="chevron_right" color="primary"></q-icon>
    </template>
    <q-breadcrumbs-el
      v-for="(crumb, idx) in crumbs"
      v-bind="crumb"
      :key="`crumb${idx}`"
    />
  </q-breadcrumbs>
</template>

<script setup lang="ts">
import { useCrumbs } from 'src/composables/breadcrumbs'
import { watch } from 'vue'

const { crumbs } = useCrumbs()
watch(crumbs, (newValue) => {
  console.log(newValue)
})
</script>
