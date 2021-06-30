import { createHttpLink, InMemoryCache } from '@apollo/client/core'
import { withXsrfLink, expiredTokenLink } from "src/apollo/apollo-links.js"

export /* async */ function getClientOptions(/* {app, router, ...} */ options) {
  return Object.assign(
    // General options.
    {
      link: expiredTokenLink.concat(withXsrfLink).concat(createHttpLink({
        uri:
          process.env.GRAPHQL_URI || '/graphql',
      })),
      cache: new InMemoryCache()
    }
  )
}