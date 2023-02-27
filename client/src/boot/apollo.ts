import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  from,
} from '@apollo/client/core'
import { onError } from '@apollo/client/link/error'
import { ApolloClients } from '@vue/apollo-composable'
import { LocalStorageWrapper, persistCache } from 'apollo3-cache-persist'
import { SessionStorage } from 'quasar'
import { boot } from 'quasar/wrappers'
import { buildApolloLinks } from 'src/apollo/apollo-client'
import { withTerminalToken } from 'src/apollo/apollo-links'
import {
  beforeEachRequiresAbility,
  beforeEachRequiresAuth,
  beforeEachRequiresRole,
} from 'src/apollo/apollo-router-guards'

export default boot(async ({ app, router }) => {
  const links = buildApolloLinks()
  if (process.env.MODE !== 'electron') {
    links.splice(
      -1,
      0,
      onError(({ graphQLErrors }) => {
        if (
          graphQLErrors &&
          graphQLErrors.some(
            (error) => error?.extensions?.category === 'authorization'
          )
        ) {
          router.push('/login')
          apolloClient.cache.reset()
          if (!SessionStorage.has('loginRedirect')) {
            SessionStorage.set(
              'loginRedirect',
              router?.currentRoute?.value?.path ?? '/'
            )
          }
        }
      })
    )
  }
  const apolloClient = new ApolloClient({
    link: from(links),
    connectToDevTools: false,
    cache: new InMemoryCache(),
  })

  const cache = new InMemoryCache()

  await persistCache({
    cache,
    storage: new LocalStorageWrapper(window.localStorage) as any,
  })

  const cachedClient = new ApolloClient({
    connectToDevTools: false,
    link: from(links),
    cache,
  })

  type ProvidedClients = {
    default: any
    cachedClient?: any
    terminalClient?: any
  }
  const apolloClients: ProvidedClients = {
    default: apolloClient,
    cachedClient,
  }

  if (process.env.MODE === 'electron') {
    const terminalClient = new ApolloClient({
      link: from([
        withTerminalToken,
        createHttpLink({
          uri: process.env.API + '/graphql',
        }),
      ]),
      cache: new InMemoryCache(),
    })
    apolloClients.terminalClient = terminalClient
  }
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

  app.provide(ApolloClients, apolloClients)
})
