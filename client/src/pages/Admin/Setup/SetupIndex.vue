<template lang="pug">
.setings-page
  .text-h3 System Settings
  .row.justify-space.q-col-gutter-lg(v-if='$route.name == "admin:settings"')
    template(v-for='(page, index) in filteredPages')
      grid-icon.col-2(v-if='!page.heading', v-bind='page')
      .col-12.config-section-header.shadow-3(v-else) {{ page.title }}
  q-card-section(v-else)
    router-view
</template>

<script>
import GridIcon from 'components/molecules/SetupGridIcon.vue'
import { defineComponent, ref, computed } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'SetupIndex',
  components: { GridIcon },
  setup() {
    const search = ref('')
    const filteredPages = computed(() =>
      setupPages.filter((v) =>
        v.title.toLowerCase().includes(search.value.toLowerCase())
      )
    )

    const router = useRouter()
    function selectPage() {
      if (filteredPages.value.length == 1) {
        const page = filteredPages.value[0]
        if (page.to) {
          router.push(page.to)
        }
      }
    }

    return { search, filteredPages, selectPage }
  },
})

const setupPages = [
  { title: 'Core', heading: true },
  {
    title: 'Badges',
    icon: 'card_membership',
    to: { name: 'admin:setup:badges' },
  },
  {
    title: 'Memberships',
    icon: 'widgets',
    //to: { name: 'admin:setup:memberships' },
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
    //to: { name: 'admin:setup:general' },
  },
  {
    title: 'Features',
    icon: 'toggle_on',
    //to: { name: 'admin:setup:features' },
  },
  {
    title: 'Payment Integration',
    icon: 'credit_card',
  },
]
</script>

<style lang="scss" scoped>
.config-section-header {
  background: $accent;
  color: white;
  font-weight: bold;
  font-size: 1.2em;
  padding: 0.2em 2em;
  margin-top: 2em;
}
</style>
