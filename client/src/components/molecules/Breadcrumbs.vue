<template lang="pug">
q-breadcrumbs
  template(#separator)
    q-icon(size='1.5em', name='chevron_right', color='primary')
  q-breadcrumbs-el(v-bind='crumb', v-for='crumb in crumbs')
</template>

<script>
import { defineComponent, computed } from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'Breadcrumbs',
  setup() {
    const $route = useRoute()

    const crumbs = computed(() => {
      return $route.matched
        .filter((r) => r.meta.crumb)
        .map((r) => {
          const crumb = {
            to: r.path,
            label: r.components.default.name,
          }
          if (typeof r.meta.crumb === 'string') {
            crumb.label = r.meta.crumb
          } else {
            Object.assign(crumb, r.meta.crumb)
          }
          return crumb
        })
    })
    return { crumbs }
  },
})
</script>

<style lang="scss"></style>
