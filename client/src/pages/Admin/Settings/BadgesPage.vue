<template>
  <div class="q-pa-md row">
    <div class="col-md-6 col-xs-12">
      <SearchBar v-model="search" new-label="New"></SearchBar>
      <div
        v-if="paginatorInfo?.total"
        class="justify-center column q-col-gutter-md q-mt-md"
      >
        <div class="col">
          <BadgesList
            :badges="badges"
            :loading="loading"
            :total="paginatorInfo.total"
            @select="select"
          ></BadgesList>
        </div>
        <q-pagination
          v-if="!!paginatorInfo.count"
          v-model="currentPage"
          class="col q-mx-auto"
          :max="paginatorInfo.lastPage"
          size="lg"
          round
        ></q-pagination>
      </div>
      <NoItemsCard
        v-if="!paginatorInfo?.total"
        message="No badges match your search"
        new-label="Create new badge"
        icon="verified"
        :search="search"
        @clear-search="clearSearch"
      ></NoItemsCard>
    </div>
  </div>
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
