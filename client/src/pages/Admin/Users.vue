<template lang="pug">
div
  q-input(v-model='search', outlined, label='Search', icon='search')
    template(#prepend)
      q-icon(name='search')
  div(v-if='totalCount')
    .justify-center.flex
      q-pagination.q-my-md(
        v-if='totalCount > 1',
        v-model='currentPage',
        :max='lastPage',
        size='lg',
        round
      )
      q-banner.bg-grey-3.text-black.col-11.q-mb-md(
        v-else,
        rounded,
        inline-actions
      )
        | Press enter to open this user account.
        template(#action)
          q-btn(icon='close', flat, size='sm')
        template(#avatar)
          q-icon(name='tips_and_updates', size='sm')
    user-list-cards(:users='users', :loading='loading')

  .row.justify-center(v-else)
    q-banner.bg-grey-3.text-black.col-11(rounded, inline-actions)
      .text-bold No users found.
      template(#avatar)
        q-icon(name='sentiment_dissatisfied')
      template(#action)
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
import { defineComponent, ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useQuery, useResult } from '@vue/apollo-composable'
import UserListCards from 'components/UserListCards.vue'

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
  name: 'SearchMembers',
  components: { UserListCards },
  setup() {
    const search = ref('')
    const searchVar = computed(() => {
      return search.value ? search.value : null
    })

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
        q: searchVar,
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
    function gotoRecord(email) {
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
