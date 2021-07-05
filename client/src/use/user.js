import {
  useQuery,
  useResult,
  useMutation,
  useApolloClient,
} from '@vue/apollo-composable'
import gql from 'graphql-tag'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'
import { reactive, computed } from 'vue'
import { currentUserGQL, loginGQL, logoutGQL } from 'src/graphql/queries'

const userExistsGQL = gql`
  query UserExists($email: String!) {
    userExists(email: $email)
  }
`

export function useCurrentUser() {
  const query = useQuery(currentUserGQL)

  const currentUser = useResult(query.result, null, (data) => {
    return data.currentUser
  })
  const isLoggedIn = useResult(query.result, false, (data) => {
    return !!data.currentUser.id
  })
  const abilities = useResult(
    query.result,
    [],
    (data) => data.currentUser.abilities
  )
  const roles = useResult(query.result, [], (data) => data.currentUser.roles)

  const can = computed(() => {
    return (ability) => {
      return abilities.value.includes('*') || abilities.value.includes(ability)
    }
  })

  const hasRole = computed(() => {
    return (role) => {
      if (typeof role === 'undefined') {
        return roles.value?.length ?? 0 > 0
      }
      return roles.value.includes(role)
    }
  })

  return { currentUser, currentUserQuery: query, isLoggedIn, can, hasRole }
}

export function useLogin() {
  /**
   * Restore credentials.
   */
  const emailStorageKey = 'authEmail'
  const $qLS = useQuasar().localStorage
  const credentials = reactive({ email: '', password: '' })

  if ($qLS.has(emailStorageKey)) {
    credentials.email = $qLS.getItem(emailStorageKey)
  }

  /**
   * Login a user.
   */
  const { mutate: loginMutation } = useMutation(loginGQL, () => ({
    update: (cache, { data: { login } }) => {
      cache.writeQuery({
        query: currentUserGQL,
        data: { currentUser: { ...login } },
      })
    },
  }))

  async function loginUser() {
    const currentUser = await loginMutation(credentials)
    $qLS.set(emailStorageKey, credentials.email)

    return currentUser.currentUser
  }

  function notMe() {
    $qLS.remove(emailStorageKey)
  }
  /**
   * Check if a user exists for email first logins.
   */
  const { resolveClient } = useApolloClient()
  async function userExists(email) {
    const client = resolveClient()

    const userExists = await client.query({
      query: userExistsGQL,
      variables: {
        email,
      },
    })

    return userExists.data.userExists
  }

  return { loginUser, userExists, credentials, notMe }
}

export function useLogout() {
  const {
    mutate: logoutMutation,
    loading: logoutLoading,
    error: logoutError,
  } = useMutation(logoutGQL, () => ({
    update: (cache) => {
      cache.writeQuery({ query: currentUserGQL, data: { currentUser: null } })
    },
  }))

  const router = useRouter()
  async function logoutUser() {
    try {
      await logoutMutation()
      router.push('/')
      return true
    } catch (e) {
      return false
    }
  }

  return { logoutUser, logoutLoading, logoutError }
}
