import { useApolloClient, useMutation, useQuery } from '@vue/apollo-composable'
import { graphql } from 'src/gql'
import { useQuasar } from 'quasar'
import type { User } from 'src/gql/graphql'
import {
  LoggedInUserDocument,
  LoginDocument,
  LogoutDocument,
  UserExistsDocument,
  UserViewDocument,
} from 'src/gql/graphql'
import { computed, reactive } from 'vue'
import { useRouter } from 'vue-router'

graphql(`
  query UserExists($email: String!) {
    userExists(email: $email)
  }
`)
export type Credentials = Pick<User, 'email'> & { password: string }

export function useCurrentUser() {
  const query = useQuery(LoggedInUserDocument)
  const currentUser = computed(() => {
    return query.result.value?.currentUser
  })
  const isLoggedIn = computed(() => {
    return !!query.result.value?.currentUser?.id
  })
  const abilities = computed(() => {
    return query.result.value?.currentUser?.abilities ?? []
  })
  const roles = computed(() => {
    return query.result.value?.currentUser?.roles ?? []
  })

  const can = computed(() => {
    return (ability: string) => {
      return Array.isArray(abilities.value)
        ? abilities.value.includes('*') || abilities.value.includes(ability)
        : false
    }
  })

  const hasRole = computed(() => {
    return (role?: string) => {
      if (typeof role === 'undefined' || role === '*') {
        return roles.value?.length ?? 0 > 0
      }
      return Array.isArray(roles.value) ? roles.value.includes(role) : false
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
  const credentials = reactive<Credentials>({ email: '', password: '' })

  if ($qLS.has(emailStorageKey)) {
    credentials.email = $qLS.getItem(emailStorageKey) as string
  }

  /**
   * Login a user.
   */
  const { mutate: loginMutation } = useMutation(LoginDocument, () => ({
    update: (cache, { data: { login } }: any) => {
      cache.writeQuery({
        query: LoggedInUserDocument,
        data: { currentUser: { ...login } },
      })
    },
  }))

  async function loginUser() {
    const currentUser = await loginMutation(credentials)
    $qLS.set(emailStorageKey, credentials.email)

    return currentUser?.data?.login
  }

  function notMe() {
    $qLS.remove(emailStorageKey)
  }
  /**
   * Check if a user exists for email first logins.
   */
  const { resolveClient } = useApolloClient()
  async function userExists(email: User['email']) {
    const client = resolveClient()

    const userExists = await client.query({
      query: UserExistsDocument,
      variables: {
        email,
      },
    })

    return userExists.data.userExists
  }

  return { loginUser, userExists, credentials, notMe }
}

export function useFindUser() {
  const { resolveClient } = useApolloClient()
  return {
    findUser: async (email: string) => {
      const client = resolveClient()

      const user = await client.query({
        query: UserViewDocument,
        variables: {
          email
        }
      })

      return user.data.user
    }
  }
}

export function useLogout() {
  const {
    mutate: logoutMutation,
    loading: logoutLoading,
    error: logoutError,
  } = useMutation(LogoutDocument, () => ({
    update: async (cache) => {
      await cache.reset()
      cache.writeQuery({
        query: LoggedInUserDocument,
        data: { currentUser: null },
      })
    },
  }))

  const router = useRouter()
  async function logoutUser() {
    try {
      await logoutMutation()
      router.push('/login')
      return true
    } catch (e) {
      return false
    }
  }

  return { logoutUser, logoutLoading, logoutError }
}
