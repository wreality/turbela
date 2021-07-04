<template lang="pug">
div
  user-list-cards(:users='users')
  .justify-center.flex.q-my-md
    q-pagination(v-model='currentPage', :max='lastPage')
</template>

<script>
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useQuery, useResult } from '@vue/apollo-composable'
import UserListCards from 'components/UserListCards.vue'

import gql from 'graphql-tag'

const usersGQL = gql`
  query getUsers($page: Int) {
    users(first: 20, page: $page) {
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
    const currentPage = ref(1)
    const { result } = useQuery(usersGQL, { page: currentPage })
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
      users,
      gotoRecord,
      lastPage,
      currentPage,
    }
  },
})
</script>

<style></style>
