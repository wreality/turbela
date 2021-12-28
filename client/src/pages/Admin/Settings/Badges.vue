<template lang="pug">
.q-pa-md.row
  .col-md-6.col-xs-12
    SearchBar(v-model:search='search', newLabel='New')
    .justify-center.column.q-col-gutter-md.q-mt-md(v-if='badgesCount')
      .col
        BadgesList(
          :badges='badges',
          :loading='loading',
          :total='paginatorInfo.total',
          @select='select'
        )
      q-pagination.col.q-mx-auto(
        v-if='paginatorInfo.count',
        v-model='currentPage',
        :max='paginatorInfo.lastPage',
        size='lg',
        round
      )
    NoItemsCard(
      message='No badges match your search',
      newLabel='Create new badge',
      icon='verified',
      :search='search',
      @clearSearch='clearSearch',
      v-if='!paginatorInfo.total'
    )
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'SetupBadges',
  data() {
    return {
      busy: false,
      saved: null,
    }
  },
})
</script>

<script setup>
import NoItemsCard from 'components/NoItemsCard.vue'
import SearchBar from 'components/SearchBar.vue'
import BadgesList from 'components/BadgesList.vue'

import { ref, computed } from 'vue'
import { BADGES } from 'src/graphql/queries'
import { useResult, useQuery } from '@vue/apollo-composable'
import { useRouter } from 'vue-router'

/** Search Field */
const search = ref('')
const searchVar = computed(() => (search.value.length ? search.value : null))
function clearSearch() {
  search.value = ''
}

/** Pagination */
const currentPage = ref(1)

/** Fetch graphql data */
const { result, loading } = useQuery(BADGES, {
  page: currentPage,
  q: searchVar,
})
const badges = useResult(result, [], (data) => data.badges.data)
const badgesCount = useResult(result, null, (data) => data.badgesCount)
const paginatorInfo = useResult(result, {}, (data) => data.badges.paginatorInfo)

const router = useRouter()

/** Navigation */
function select(badge) {
  router.push({
    name: 'admin:setup:badge:view',
    params: { id: badge.id },
  })
}
</script>
