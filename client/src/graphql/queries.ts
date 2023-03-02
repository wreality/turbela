import gql from 'graphql-tag'

export const userFragment = gql`
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
`

export const CURRENT_USER = gql`
  query LoggedInUser {
    currentUser {
      ...User_current
    }
  }
  ${userFragment}
`

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      ...User_current
    }
  }
  ${userFragment}
`

export const LOGOUT = gql`
  mutation Logout {
    logout {
      id
    }
  }
`

export const badgeFieldsFragment = gql`
  fragment badgeFields on Badge {
    name
  }
`

export const GETBADGE = gql`
  query GetBadge($id: ID!) {
    badge(id: $id) {
      id
      ...badgeFields
    }
  }
  ${badgeFieldsFragment}
`

gql`
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
`

gql`
  query HelloTerminal {
    helloTerminal {
      name
    }
  }
`
