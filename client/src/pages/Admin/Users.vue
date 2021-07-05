<template lang="pug">
div
  q-input.q-mb-md(v-model='search', outlined, label='Search', icon='search')
    template(#prepend)
      q-icon(name='search')
  user-list-cards(:users='users')
  .justify-center.flex.q-my-md
    q-pagination(v-model='currentPage', :max='lastPage')
</template>

<script>
import { defineComponent, ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useQuery, useResult } from '@vue/apollo-composable'
import UserListCards from 'components/UserListCards.vue'

import gql from 'graphql-tag'

const usersGQL = gql`
  query getUsers($page: Int, $q: String) {
    users(first: 20, page: $page, q: $q) {
      paginatorInfo {
        lastPage
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
    const $router = useRouter()
    const search = ref('')
    const searchString = computed(() => {
      return search.value ? search.value : null
    })
    const currentPage = ref(1)
    const { result } = useQuery(usersGQL, {
      page: currentPage,
      q: searchString,
    })
    const users = useResult(result, [], (data) => data.users.data)
    const lastPage = useResult(
      result,
      1,
      (data) => data.users.paginatorInfo.lastPage
    )
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
    }
  },
})
</script>

<style></style>
