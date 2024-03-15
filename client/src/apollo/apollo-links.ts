import { setContext } from '@apollo/client/link/context'
import { ApolloLink } from '@apollo/client/core'
import createUploadLink from 'apollo-upload-client/createUploadLink.mjs';
import { BatchHttpLink } from '@apollo/client/link/batch-http'
import { scalarLink } from './apollo-scalar-link'
const terminalStore = useTerminalStore()

const { get } = useRuntimeConfig()

const apiUri = get('API')

export const withToken = setContext(async (_, { headers }) => {
  //If we have a token in the header, go ahead and use it.
  if (headers && headers['Authorization']) {
    return { headers }
  }

  const { keycloak } = useAuthentication()

  if (keycloak.authenticated && keycloak.isTokenExpired(5)) {
    await keycloak.updateToken(5)
  }
  const token = keycloak.token

  if (!token) {
    return { headers }
  }
  return {
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`,
    },
  }
})

export const withTerminalToken = setContext((_, { headers }) => {
  if (headers && headers['Authorization']) {
    return { headers }
  }
  const token = terminalStore.terminalToken.value
  return { headers: { ...headers, Authorization: `Bearer ${token}` } }
})

export const withRefUri = (uriRef: Ref<string| null>) => {
  return setContext(() => ({ uri: uriRef.value }))
}

export const withTerminalUri = withRefUri(terminalStore.terminalUrl)


const httpOptions: { uri?: string } = {
  uri: apiUri,
}

const linkChain: ApolloLink[] = [
  scalarLink,
]

if (process.env.MODE === 'electron') {
  linkChain.push(withToken, withTerminalUri)
} else {
  linkChain.push(withToken)
}
linkChain.push(
  ApolloLink.split(
    (operation) => operation.getContext().hasUpload,
    createUploadLink(httpOptions),
    new BatchHttpLink(httpOptions)
  )
)


export { linkChain }


