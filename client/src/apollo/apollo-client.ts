import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  from,
} from '@apollo/client/core'
import {
  linkChain,
  withTerminalToken,
  withTerminalUri
} from 'src/apollo/apollo-links'
import { LocalStorageWrapper, persistCache } from 'apollo3-cache-persist'
import { useRuntimeConfig } from 'src/composables/runtimeConfig'

const { get } = useRuntimeConfig()
const apiUri = get('API')

export const defaultClient = new ApolloClient({
  link: from(linkChain),
  connectToDevTools: true,
  cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'cache-and-network',
      }
    }
})

const cache = new InMemoryCache();

(async function (){

  await persistCache({
    cache,
    storage: new LocalStorageWrapper(window.localStorage) as any,
  })
})()

export const cachedClient = new ApolloClient({
  connectToDevTools: false,
  link: from(linkChain),
  cache,
})


export const terminalClient = new ApolloClient({
  link: from([
    withTerminalUri,
    withTerminalToken,
    createHttpLink({
      uri: apiUri,
    }),
  ]),
  cache: new InMemoryCache(),
})
