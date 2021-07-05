import gql from 'graphql-tag'

export const userFragment = gql`
  fragment User_current on User {
    email
    name
    id
    roles
    abilities
  }
`

export const currentUserGQL = gql`
  query LoggedInUser {
    currentUser {
      ...User_current
    }
  }
  ${userFragment}
`

export const loginGQL = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      ...User_current
    }
  }
  ${userFragment}
`

export const logoutGQL = gql`
  mutation Logout {
    logout {
      id
    }
  }
`
