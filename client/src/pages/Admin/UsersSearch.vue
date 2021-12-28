<template lang="pug">
.q-pa-md
  SearchBar(v-model:search='search', newLabel='New User')
  .justify-center.column.q-col-gutter-md.q-mt-md(v-if='totalCount')
    q-pagination.col.q-mx-auto(
      v-if='totalCount > 1',
      v-model='currentPage',
      :max='lastPage',
      size='lg',
      round
    )
    user-list-cards.col(
      :users='users',
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

<script>
import { defineComponent, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useQuery, useResult } from '@vue/apollo-composable'
import UserListCards from 'components/UserListCards.vue'
import SearchInput from 'components/molecules/SearchInput.vue'

import gql from 'graphql-tag'
import NoItemsCard from 'src/components/NoItemsCard.vue'
import SearchBar from 'src/components/SearchBar.vue'

const usersGQL = gql`
  query getUsers($page: Int, $q: String) {
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

export default defineComponent({
  name: 'UsersSearch',
  components: { UserListCards, SearchInput, NoItemsCard, SearchBar },
  setup() {
    const search = ref('')
    watch(search, () => {
      currentPage.value = 1
    })

    function clearSearch() {
      search.value = ''
    }

    const currentPage = ref(1)

    const { result, loading } = useQuery(
      usersGQL,
      {
        page: currentPage,
        q: search,
      },
      { fetchPolicy: 'cache-and-network' }
    )
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

    function gotoRecord(user) {
      let email = user?.email ?? null
      if (!email && users.value.length == 1) {
        email = users.value[0].email
      }
      if (!email) {
        return
      }
      $router.push({
        name: 'admin:users:view',
        params: { email },
      })
    }
    return {
      search,
      users,
      gotoRecord,
      lastPage,
      currentPage,
      loading,
      totalCount,
      clearSearch,
    }
  },
})
</script>

<style></style>
