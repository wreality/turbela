<template>
  <div class="row">
    <div v-if="!loading && !hideIndex" class="col-md-3 col-xs-12">
      <div class="column items-center">
        <CompactSearchBar
          v-model:search="search"
          new-label="New"
          @create="gotoNew"
        ></CompactSearchBar>
        <q-list class="col fit" bordered separator>
          <q-item
            v-for="plan in plans"
            :key="plan.id"
            :to="{
              name: 'admin:memberships:view',
              params: { id: plan.id },
            }"
            clickable
          >
            <q-item-section
              :to="{
                name: 'admin:memberships:view',
                params: { id: plan.id },
              }"
              >{{ plan.name }}</q-item-section
            >
          </q-item>
        </q-list>
        <q-pagination
          v-if="paginatorInfo?.count"
          v-model="currentPage"
          class="col q-mt-md"
          :max="paginatorInfo.lastPage"
          size="lg"
          round
        ></q-pagination>
      </div>
    </div>
    <div v-if="!isIndex" class="col">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useQuery } from '@vue/apollo-composable'
import { useQuasar } from 'quasar'
import CompactSearchBar from 'src/components/CompactSearchBar.vue'
import { GetPlansDocument } from 'src/generated/graphql'
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
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
