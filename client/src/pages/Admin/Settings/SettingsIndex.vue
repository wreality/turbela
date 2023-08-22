<template>
  <div class="setings-page q-pa-md">
    <div class="row q-col-gutter-lg">
      <template v-for="(page, index) in filteredPages" :key="`setting${index}`">
        <grid-icon
          v-if="!page.heading"
          class="col-md-3 col-sm-4 col-xs-6 col-lg-3"
          v-bind="page"
        ></grid-icon>
        <div v-else class="col-12 config-section-header shadow-3">
          {{ page.title }}
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import GridIcon from 'components/_molecules/SetupGridIcon.vue'
import { useCurrentUser } from 'src/composables/user'
import { computed, ref } from 'vue'
const search = ref('')
const filteredPages = computed(() =>
  setupPages
    .filter((v) => v.title.toLowerCase().includes(search.value.toLowerCase()))
    .filter((v) => {
      if (v?.can) {
        return can.value(v.can)
      } else {
        return true
      }
    })
)

//const router = useRouter()
// function selectPage() {
//   if (filteredPages.value.length == 1) {
//     const page = filteredPages.value[0]
//     if (page.to) {
//       router.push(page.to)
//     }
//   }
// }

const { can } = useCurrentUser()

const setupPages = [
  { title: 'Core', heading: true },
  {
    title: 'Badges',
    icon: 'sym_o_award_star',
    to: { name: 'admin:setup:badges' },
  },
  {
    title: 'Courses',
    icon: 'school',
    to: { name: 'admin:courses:index' },
  },
  {
    title: 'Memberships',
    icon: 'widgets',
    to: { name: 'admin:setup:memberships' },
  },
  {
    title: 'Overlays',
    icon: 'image',
    to: { name: 'admin:overlays:index' },
  },
  {
    title: 'Access Control',
    icon: 'lock',
  },
  {
    title: 'Discounts',
    icon: 'local_offer',
    //to: { name: 'admin:setup:discounts' },
  },
  {
    title: 'Content',
    heading: true,
  },
  {
    title: 'Email Templates',
    icon: 'mail',
  },
  {
    title: 'Page Content',
    icon: 'more_horiz',
    //to: { name: 'admin:setup:pageContent' },
  },
  {
    title: 'Configuration',
    heading: true,
  },
  {
    title: 'General Setup',
    icon: 'tune',
    can: 'update-general-settings',
    to: { name: 'admin:settings:general' },
  },
  {
    title: 'Admin Section Setup',
    icon: 'admin_panel_settings',
    can: 'update-admin-settings',
    to: { name: 'admin:settings:admin' },
  },
  {
    title: 'Features',
    icon: 'toggle_on',
    //to: { name: 'admin:setup:features' },
  },
  {
    title: 'Payment Integration',
    icon: 'credit_card',
    to: { name: 'admin:settings:payment' },
  },
  {
    title: 'POS Terminals',
    icon: 'point_of_sale',
    to: { name: 'admin:settings:terminal' },
  },
]
</script>
