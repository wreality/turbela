
import { ApolloClients } from '@vue/apollo-composable'
import { boot } from 'quasar/wrappers'
import {  defaultClient, cachedClient, terminalClient } from 'src/apollo/apollo-client'
import {
  setupRouterGuards,
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

  setupRouterGuards(router)

  app.provide(ApolloClients, apolloClients)
})
