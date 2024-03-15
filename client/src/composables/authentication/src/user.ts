import { useApolloClient, useQuery } from '@vue/apollo-composable'
import { graphql } from 'src/gql'
import type { User } from 'src/gql/graphql'
import {
  LoggedInUserDocument,
  UserExistsDocument,
  UserViewDocument,
} from 'src/gql/graphql'
import { AbilityName } from 'src/graphql/user_abilities'
import { computed } from 'vue'

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
  const isLoggedIn = computed(() =>  !!query.result.value?.currentUser?.id)
  const abilities = computed(() =>  query.result.value?.currentUser?.abilities ?? [])
  const roles = computed(() =>  query.result.value?.currentUser?.roles ?? [])

  function can(ability: AbilityName | AbilityName[] | undefined) {
    if (!ability) {
      return true
    }
    const abilityArray = Array.isArray(ability) ? ability : [ability]

    return abilityArray.every(a => abilities.value.includes('*:*') || abilities.value.includes(a))
  }

  const hasRole = computed(() => {
    return (role?: string) => {
      if (typeof role === 'undefined' || role === '*') {
        return roles.value?.length ?? 0 > 0
      }
      return Array.isArray(roles.value) ? roles.value.includes(role) : false
    }
  })

  return { currentUser, currentUserQuery: query, isLoggedIn, can, hasRole, abilities }
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

export function useLogin() {
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

  return { userExists }
}
