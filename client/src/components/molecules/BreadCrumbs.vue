<template lang="pug">
q-breadcrumbs
  template(#separator)
    q-icon(size='1.5em', name='chevron_right', color='primary')
  q-breadcrumbs-el(v-bind='crumb', v-for='crumb in crumbs')
</template>

<script setup>
import { computed, inject, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { useBreadcrumbTags } from 'src/composables/breadcrumbs'

const $route = useRoute()

const { getTag } = useBreadcrumbTags()

const crumbs = computed(() => {
  return $route.matched
    .filter((r) => r.meta.crumb)
    .map((r) => {
      const crumb = reactive({
        to: r.path,
        label: r.components.default.name,
      })
      if (typeof r.meta.crumb === 'string') {
        crumb.label = r.meta.crumb
      } else {
        Object.assign(crumb, r.meta.crumb)
      }
      if (crumb.label[0] == '#') {
        crumb.label = getTag(crumb.label)
      }

      return crumb
    })
})
</script>

<style lang="scss"></style>
