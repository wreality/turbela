<template>
  <div class="q-pa-md">
    <SearchBar
      v-model="search"
      new-label="New User"
      @create="gotoNewUser"
    ></SearchBar>
    <div
      v-if="totalCount && !loading"
      class="justify-center column q-col-gutter-md q-mt-md"
    >
      <q-pagination
        v-if="totalCount > 1"
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
    <div v-else-if="loading" class="justify-center row q-mt-lg">
      <div class="col-md-4">
        <q-card class="bg-grey-2">
          <q-card-section class="text-center">
            <q-spinner size="xl" />
          </q-card-section>
        </q-card>
      </div>
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

import NoItemsCard from 'src/components/NoItemsCard.vue'
import SearchBar from 'src/components/SearchBar.vue'

import type { User } from 'src/generated/graphql'
import { GetUsersDocument } from 'src/generated/graphql'

const variables = reactive({
  q: '',
  page: 1,
})
const search = toRef(variables, 'q')

watch(search, () => {
  currentPage.value = 1
})

function clearSearch() {
  search.value = ''
}

const currentPage = toRef(variables, 'page')

const { result, loading } = useQuery(GetUsersDocument, variables, {
  fetchPolicy: 'cache-and-network',
})

const users = computed(() => {
  console.log(variables)
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

<script lang="ts">
import gql from 'graphql-tag'
gql`
  query GetUsers($page: Int, $q: String) {
    users(first: 24, page: $page, q: $q) {
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
</script>

<style></style>
