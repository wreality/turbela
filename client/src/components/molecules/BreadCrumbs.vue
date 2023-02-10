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
import { computed, reactive } from 'vue'
import { useRoute } from 'vue-router'
import type { RouteLocationRaw } from 'vue-router'
import { useBreadcrumbTags } from 'src/composables/breadcrumbs'
import type { MaybeRef } from '@vueuse/core'
const $route = useRoute()

const { getTag } = useBreadcrumbTags()

interface Crumb {
  /**
   * Label for the crumb
   */
  label: MaybeRef<string>
  /**
   * Destination for the crumb
   */
  to?: RouteLocationRaw
  /**
   * Icon to add before brumbcrumb elements
   */
  icon?: string
}

const crumbs = computed(() => {
  const params = $route.params
  return $route.matched
    .filter((r) => r.meta.crumb)
    .map((r) => {
      const crumb = reactive<Crumb>({
        to: r.name ? { name: r.name, params } : r.path,
        label: r.components?.default?.name ?? '',
      })
      const routeCrumb = r.meta.crumb as Crumb | string
      if (typeof routeCrumb === 'string') {
        crumb.label = routeCrumb
      } else {
        Object.assign(crumb, routeCrumb)
      }
      if ((crumb.label[0] ?? '') == '#') {
        crumb.label = (getTag(crumb.label) as unknown as string) ?? ''
      }

      return crumb
    })
})
</script>
