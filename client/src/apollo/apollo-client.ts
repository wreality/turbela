import {
  expiredTokenLink,
  withToken,
  withXsrfLink,
} from 'src/apollo/apollo-links'
import { createUploadLink } from 'apollo-upload-client'
import { BatchHttpLink } from '@apollo/client/link/batch-http'
import { ApolloLink } from '@apollo/client/core'
export function buildApolloLinks() {
  const httpOptions = {
    uri: process.env.API + '/graphql',
  }
  const links = []
  if (process.env.MODE === 'electron') {
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
