<template lang="pug">
.row
  .col-md-3.col-xs-12(v-if='!loading && !hideIndex')
    .column.items-center
      CompactSearchBar(
        v-model:search='search',
        newLabel='New',
        @create='gotoNew'
      )
      q-list.col.fit(bordered, separator)
        q-item(
          v-for='plan in plans',
          :key='plan.id',
          :to='{ name: "admin:setup:memberships:view", params: { id: plan.id } }',
          clickable
        )
          q-item-section(
            :to='{ name: "admin:setup:memberships:view", params: { id: plan.id } }'
          ) {{ plan.name }}
      q-pagination.col.q-mt-md(
        v-if='paginatorInfo?.count',
        v-model='currentPage',
        :max='paginatorInfo.lastPage',
        size='lg',
        round
      )
  .col(v-if='!isIndex')
    router-view
</template>

<script setup lang="ts">
import CompactSearchBar from 'src/components/CompactSearchBar.vue'
import { useQuery } from '@vue/apollo-composable'
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { GetPlansDocument } from 'src/generated/graphql'
const search = ref('')
const currentPage = ref(1)
const { result, loading } = useQuery(GetPlansDocument, {
  page: currentPage as unknown as number,
})

const plans = computed(() => result.value?.getPlans?.data ?? [])

const paginatorInfo = computed(() => result.value?.getPlans?.paginatorInfo)

const route = useRoute()
const { platform } = useQuasar()
const isIndex = computed(() => {
  return route.name === 'admin:setup:memberships'
})

const hideIndex = computed((): boolean => {
  return !isIndex.value && !!platform.is.mobile
})

const { push } = useRouter()

function gotoNew() {
  push({ name: 'admin:setup:memberships:new' })
}
</script>

<script lang="ts">
import { gql } from 'graphql-tag'

gql`
  query GetPlans($page: Int!) {
    getPlans(page: $page) {
      paginatorInfo {
        count
        total
        lastPage
      }
      data {
        id
        name
      }
    }
  }
`
</script>
