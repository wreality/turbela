<template>
  <div class="q-pa-md">
    <SearchBar v-model="search" new-label="New User"></SearchBar>
    <div
      v-if="totalCount"
      class="justify-center column q-col-gutter-md q-mt-md"
    >
      <q-pagination
        v-if="totalCount &gt; 1"
        v-model="currentPage"
        class="col q-mx-auto"
        :max="lastPage"
        size="lg"
        round
      />
      <UserListCards
        v-if="users.length"
        class="col"
        :users="[...users]"
        :loading="loading"
        :total="totalCount"
        @select="gotoRecord"
      />
    </div>
    <NoItemsCard
      v-else
      message="No users match your search"
      new-label="Create new user"
      icon="no_accounts"
      :search="search"
      @clear-search="clearSearch"
      @add-item="gotoNewUser"
    ></NoItemsCard>
  </div>
</template>

<script setup lang="ts">
import { useQuery } from '@vue/apollo-composable'
import UserListCards from 'components/UserListCards.vue'
import { computed, reactive, toRef, watch } from 'vue'
import { useRouter } from 'vue-router'

import gql from 'graphql-tag'
import NoItemsCard from 'src/components/NoItemsCard.vue'
import SearchBar from 'src/components/SearchBar.vue'

import type { User } from 'src/generated/graphql'
import { GetUsersDocument } from 'src/generated/graphql'
gql`
  query GetUsers($page: Int, $q: String) {
    users(first: 12, page: $page, q: $q) {
      paginatorInfo {
        lastPage
        total
      }
      data {
        id
        name
        email
      }
    }
  }
`

const variables = reactive({
  q: '',
  currentPage: 1,
})
const search = toRef(variables, 'q')

watch(search, () => {
  currentPage.value = 1
})

function clearSearch() {
  search.value = ''
}

const currentPage = toRef(variables, 'currentPage')

const { result, loading } = useQuery(GetUsersDocument, variables, {
  fetchPolicy: 'cache-and-network',
})

const users = computed(() => {
  return (result.value?.users?.data ?? []) as User[]
})

const totalCount = computed(() => {
  return result.value?.users?.paginatorInfo?.total ?? 1
})

const lastPage = computed(() => {
  return result.value?.users?.paginatorInfo?.lastPage ?? 1
})

const $router = useRouter()

function gotoRecord(user?: User) {
  if (user) {
    push(user.id)
  } else if (users.value.length == 1) {
    push(users.value[0].id)
  }

  function push(id: User['id']) {
    $router.push({
      name: 'admin:users:view',
      params: { id },
    })
  }
}

function gotoNewUser() {
  $router.push({
    name: 'admin:users:create',
  })
}
</script>

<style></style>
