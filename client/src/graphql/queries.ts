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

export const BADGES = gql`
  query GetBadges($page: Int!, $q: String) {
    badgesCount
    badges(q: $q, page: $page) {
      data {
        id
        ...badgeFields
      }
      paginatorInfo {
        count
        currentPage
        lastPage
        total
      }
    }
  }
  ${badgeFieldsFragment}
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

export const CREATEBADGE = gql`
  mutation CreateBadge($name: String!) {
    createBadge(input: { name: $name }) {
      id
      ...badgeFields
    }
  }
  ${badgeFieldsFragment}
`

export const UPDATEBADGE = gql`
  mutation UpdateBadge($id: ID!, $name: String!) {
    updateBadge(id: $id, input: { name: $name }) {
      id
      ...badgeFields
    }
  }
  ${badgeFieldsFragment}
`
