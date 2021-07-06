<template lang="pug">
.q-pa-md
  .row.q-gutter-md
    .col
      search-input.col(v-model='search', @keyup.enter='gotoRecord')
    q-btn.col-2(label='Create Account', icon='add_circle')
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
  .justify-center.row.q-mt-lg(v-else-if='!loading')
    .col-md-4
      q-card.bg-grey-2
        q-card-section.text-center
          q-icon(name='no_accounts', size='8rem', color='grey-9')
          .text-h6 No users matched your search
        q-separator(dark)
        q-card-actions
          q-btn(
            v-if='search.length',
            flat,
            icon='backspace',
            label='Clear Search',
            @click='clearSearch'
          )
          q-btn(flat, label='Create User', icon='add_circle')
</template>

<script>
import { defineComponent, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useQuery, useResult } from '@vue/apollo-composable'
import UserListCards from 'components/UserListCards.vue'
import SearchInput from 'components/molecules/SearchInput.vue'

import gql from 'graphql-tag'

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
  name: 'Users',
  components: { UserListCards, SearchInput },
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
