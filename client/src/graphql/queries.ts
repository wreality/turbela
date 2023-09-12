import { graphql } from 'src/gql'

export const userFragment = graphql(`
  fragment User_current on User {
    email
    name
    id
    roles
    abilities
    avatar {
      srcset
      url
    }
  }
`)

export const CURRENT_USER = graphql(`
  query LoggedInUser {
    currentUser {
      email
      name
      id
      roles
      abilities
      avatar {
        srcset
        url
      }
    }
  }
`)

export const LOGIN = graphql(`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      ...User_current
    }
  }
  ${userFragment}
`)

export const LOGOUT = graphql(`
  mutation Logout {
    logout {
      id
    }
  }
`)

export const badgeFieldsFragment = graphql(`
  fragment badgeFields on Badge {
    name
    created_at
    updated_at
  }
`)

export const GETBADGE = graphql(`
  query GetBadge($id: ID!) {
    badge(id: $id) {
      id
      ...badgeFields
    }
  }
  ${badgeFieldsFragment}
`)

graphql(`
  query LocatorLookup($token: String!, $type: LocatorTypes!) {
    locator(token: $token, type: $type) {
      id
      target {
        ... on User {
          id
          email
          name
          avatar {
            srcset
            url
          }
        }
        __typename
      }
    }
  }
`)

graphql(`
  query HelloTerminal {
    helloTerminal {
      name
    }
  }
`)
