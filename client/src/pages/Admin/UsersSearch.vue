<template lang="pug">
.q-pa-md
  SearchBar(v-model='search', newLabel='New User')
  .justify-center.column.q-col-gutter-md.q-mt-md(v-if='totalCount')
    q-pagination.col.q-mx-auto(
      v-if='totalCount > 1',
      v-model='currentPage',
      :max='lastPage',
      size='lg',
      round
    )
    UserListCards.col(
      v-if='users.length',
      :users='[...users]',
      :loading='loading',
      @select='gotoRecord',
      :total='totalCount'
    )
  NoItemsCard(
    message='No users match your search',
    newLabel='Create new user',
    icon='no_accounts',
    :search='search',
    @clearSearch='clearSearch'
  )
</template>

<script setup lang="ts">
import { ref, watch, toRef, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useQuery, useResult } from '@vue/apollo-composable'
import UserListCards from 'components/UserListCards.vue'

import gql from 'graphql-tag'
import NoItemsCard from 'src/components/NoItemsCard.vue'
import SearchBar from 'src/components/SearchBar.vue'

import { GetUsersDocument } from 'src/generated/graphql'
import type { User } from 'src/generated/graphql'
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
const users = useResult(result, [], (data) => data.users.data)
const totalCount = useResult(
  result,
  0,
  (data) => data.users.paginatorInfo.total
)
const lastPage = useResult(
  result,
  1,
  (data) => data.users.paginatorInfo.lastPage
)

const $router = useRouter()

function gotoRecord(user?: User) {
  if (user) {
    push(user.email)
  } else if (users.value.length == 1) {
    push(users.value[0].email)
  }

  function push(email: User['email']) {
    $router.push({
      name: 'admin:users:view',
      params: { email },
    })
  }
}
</script>

<style></style>
