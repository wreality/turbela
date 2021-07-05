import { boot } from 'quasar/wrappers'
import { SessionStorage } from 'quasar'
import { onError } from '@apollo/client/link/error'
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client/core'

import { DefaultApolloClient } from '@vue/apollo-composable'
import {
  beforeEachRequiresAuth,
  beforeEachRequiresRole,
  beforeEachRequiresAbility,
} from 'src/apollo/apollo-router-guards'
import { withXsrfLink, expiredTokenLink } from 'src/apollo/apollo-links.js'

export default boot(({ app, router }) => {
  const apolloClient = new ApolloClient({
    link: expiredTokenLink
      .concat(withXsrfLink)
      .concat(
        onError(({ graphQLErrors }) => {
          if (
            graphQLErrors &&
            graphQLErrors.some(
              (error) => error?.extensions?.category === 'authorization'
            )
          ) {
            router.push('/login')
            apolloClient.resetStore()
            if (!SessionStorage.has('loginRedirect')) {
              SessionStorage.set(
                'loginRedirect',
                router?.currentRoute?.value?.path ?? '/'
              )
            }
          }
        })
      )
      .concat(
        createHttpLink({
          uri: process.env.GRAPHQL_URI || '/graphql',
        })
      ),
    cache: new InMemoryCache(),
  })

  /**
   * Check routes for requiresAuth meta field.
   */
  router.beforeEach(async (to, from, next) =>
    beforeEachRequiresAuth(apolloClient, to, from, next)
  )

  /**
   * Check routes for requiresRoles meta field.
   */
  router.beforeEach(async (to, from, next) =>
    beforeEachRequiresAbility(apolloClient, to, from, next)
  )

  router.beforeEach(async (to, from, next) =>
    beforeEachRequiresRole(apolloClient, to, from, next)
  )

  app.provide(DefaultApolloClient, apolloClient)
})
