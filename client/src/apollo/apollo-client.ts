import { ApolloLink } from '@apollo/client/core'
import { BatchHttpLink } from '@apollo/client/link/batch-http'
import { createUploadLink } from 'apollo-upload-client'
import {
  expiredTokenLink,
  withTerminalUri,
  withToken,
  withXsrfLink,
} from 'src/apollo/apollo-links'
export function buildApolloLinks() {
  const httpOptions: { uri?: string } = {
    uri: process.env.API + '/graphql',
  }
  const links = []
  if (process.env.MODE === 'electron') {
    links.push(withToken, withTerminalUri)
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
