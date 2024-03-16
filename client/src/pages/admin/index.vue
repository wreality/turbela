<template>
  <div class="setings-page q-pa-md">
    <div class="row q-col-gutter-lg">
      <template v-for="(page, index) in filteredPages" :key="`setting${index}`">
        <setup-grid-icon
          v-if="!page.heading"
          class="col-md-3 col-sm-4 col-xs-6 col-lg-3"
          v-bind="page"
        ></setup-grid-icon>
        <div v-else class="col-12 config-section-header shadow-3">
          {{ page.title }}
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router/auto'

definePage({
  name: 'settings:index',
})

const search = ref('')
const filteredPages = computed(() =>
  setupPages.filter((v) =>
    v.title.toLowerCase().includes(search.value.toLowerCase())
  )
)

type SetupPage = {
  title: string
  icon?: string
  to?: RouteLocationRaw
  can?: string
  heading?: boolean
}

const setupPages: SetupPage[] = [
  { title: 'Core', heading: true },
  {
    title: 'Badges',
    to: { name: 'settings:badges' },
  },
  {
    title: 'Courses',
    //to: { name: 'admin:courses:index' },
  },
  {
    title: 'Memberships',
    to: { name: '/admin/plans/' },
  },
  {
    title: 'Overlays',
    to: { name: '/admin/overlays/' },
  },
  {
    title: 'Access Control',
  },
  {
    title: 'Discounts',
    //to: { name: 'admin:setup:discounts' },
  },
  {
    title: 'Content',
    heading: true,
  },
  {
    title: 'Email Templates',
  },
  {
    title: 'Page Content',
    //to: { name: 'admin:setup:pageContent' },
  },
  {
    title: 'Configuration',
    heading: true,
  },
  {
    title: 'General Setup',
    to: { name: 'settings:general' },
  },
  {
    title: 'Admin Section Setup',
    //to: { name: 'admin:settings:admin' },
  },
  {
    title: 'Features',
    //to: { name: 'admin:setup:features' },
  },
  {
    title: 'Payment Integration',
    //to: { name: 'admin:settings:payment' },
  },
  {
    title: 'POS Terminals',
    to: { name: '/admin/terminals/' },
  },
]
</script>
