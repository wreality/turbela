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
        <q-card flat>
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
import type { User } from 'src/gql/graphql'

definePage({
  name: 'users:search',
  meta: {
    appIcon: 'users',
    pageTitle: 'User Search',
    auth: {
      needsAbilities: 'search:User',
    },
  },
})

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
  return (result.value?.users?.data ?? []) as User[]
})

const totalCount = computed(() => {
  return result.value?.users?.paginatorInfo?.total ?? 1
})

const lastPage = computed(() => {
  return result.value?.users?.paginatorInfo?.lastPage ?? 1
})

const { push } = useRouter()

function gotoRecord(user?: User) {
  let id: string
  if (user) {
    id = user.id
  } else if (users.value.length == 1) {
    id = users.value[0].id
  } else {
    throw new Error('No user to view')
  }
  push({ name: 'users:view', params: { id } })
}

function gotoNewUser() {
  push({ name: 'users:new' })
}
</script>

<script lang="ts">
graphql(`
  query GetUsers($page: Int, $q: String) {
    users(first: 24, page: $page, search: $q) {
      paginatorInfo {
        lastPage
        total
      }
      data {
        id
        name
        email
        ...UserCard
      }
    }
  }
`)
</script>
