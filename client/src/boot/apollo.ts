
import { ApolloClients } from '@vue/apollo-composable'
import { boot } from 'quasar/wrappers'
import {  defaultClient, cachedClient, terminalClient } from 'src/apollo/apollo-client'
import {
  beforeEachAllowGuest,
  beforeEachRequiresAbility,
  beforeEachRequiresRole,
} from 'src/apollo/apollo-router-guards'

export type ProvidedClients = {
  default: any
  cachedClient?: any
  terminalClient?: any
}

export default boot(async ({ app, router }) => {
  const apolloClients: ProvidedClients = {
    default: defaultClient,
    cachedClient,
  }

  if (process.env.MODE === 'electron') {
    apolloClients.terminalClient = terminalClient
  }

  /**
   * Check routes for requiresAuth meta field.
   */
  router.beforeEach(async (to, from, next) =>
    beforeEachAllowGuest(defaultClient, to, from, next)
  )

  /**
   * Check routes for requiresRoles meta field.
   */
  router.beforeEach(async (to, from, next) =>
    beforeEachRequiresAbility(defaultClient, to, from, next)
  )

  router.beforeEach(async (to, from, next) =>
    beforeEachRequiresRole(defaultClient, to, from, next)
  )

  app.provide(ApolloClients, apolloClients)
})
