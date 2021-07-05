import { ApolloClient /*, createHttpLink */ } from '@apollo/client/core'
import { DefaultApolloClient } from '@vue/apollo-composable'
import { boot } from 'quasar/wrappers'
import { getClientOptions } from 'src/apollo'
import {
  beforeEachRequiresAuth,
  beforeEachRequiresRole,
  beforeEachRequiresAbility,
} from 'src/apollo/apollo-router-guards'

export default boot(({ app, router }) => {
  const options = /* await */ getClientOptions(/* {app, router ...} */)
  const apolloClient = new ApolloClient(options)

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
