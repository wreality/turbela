<template lang="pug">
.q-pa-md.row
  .col-md-6.col-xs-12
    SearchBar(v-model='search', newLabel='New')
    .justify-center.column.q-col-gutter-md.q-mt-md(v-if='paginatorInfo?.total')
      .col
        BadgesList(
          :badges='badges',
          :loading='loading',
          :total='paginatorInfo.total',
          @select='select'
        )
      q-pagination.col.q-mx-auto(
        v-if='!!paginatorInfo.count',
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
      v-if='!paginatorInfo?.total'
    )
</template>

<script setup lang="ts">
import NoItemsCard from 'components/NoItemsCard.vue'
import SearchBar from 'components/SearchBar.vue'
import BadgesList from 'components/BadgesList.vue'

import { computed, reactive, toRef } from 'vue'
import { GetBadgesDocument } from 'src/generated/graphql'
import type { Badge } from 'src/generated/graphql'
import { useQuery } from '@vue/apollo-composable'
import { useRouter } from 'vue-router'

/** Search Field */

function clearSearch() {
  search.value = ''
}

/** Pagination */
const variables = reactive({
  page: 1,
  q: '',
})
const currentPage = toRef(variables, 'page')
const search = toRef(variables, 'q')

/** Fetch graphql data */
const { result, loading } = useQuery(GetBadgesDocument, variables)
const badges = computed(() => (result.value?.badges?.data ?? []) as Badge[])
const paginatorInfo = computed(() => result.value?.badges?.paginatorInfo)

const router = useRouter()

/** Navigation */
function select(badge: Pick<Badge, 'id'>) {
  router.push({
    name: 'admin:setup:badge:view',
    params: { id: badge.id },
  })
}
</script>
