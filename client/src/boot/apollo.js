import { ApolloClient /*, createHttpLink */ } from '@apollo/client/core'
import { DefaultApolloClient } from '@vue/apollo-composable'
import { boot } from 'quasar/wrappers'
import { getClientOptions } from 'src/apollo'

export default boot(({ app }) => {
  const options = /* await */ getClientOptions(/* {app, router ...} */)
  const apolloClient = new ApolloClient(options)

  app.provide(DefaultApolloClient, apolloClient)
})
