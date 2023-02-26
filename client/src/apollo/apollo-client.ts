import { ApolloLink } from '@apollo/client/core'
import { BatchHttpLink } from '@apollo/client/link/batch-http'
import { createUploadLink } from 'apollo-upload-client'
import {
  expiredTokenLink,
  withToken,
  withXsrfLink,
} from 'src/apollo/apollo-links'
import { useTerminalStore } from 'src/composables/terminal'
export function buildApolloLinks() {
  const httpOptions = {
    uri: process.env.API + '/graphql',
  }
  const links = []
  if (process.env.MODE === 'electron') {
    const { terminalUrl } = useTerminalStore()

    httpOptions.uri = terminalUrl.value + '/graphql'
    links.push(withToken)
  } else {
    links.push(expiredTokenLink, withXsrfLink)
  }
  links.push(
    ApolloLink.split(
      (operation) => operation.getContext().hasUpload,
      createUploadLink(httpOptions),
      new BatchHttpLink(httpOptions)
    )
  )
  return links
}
