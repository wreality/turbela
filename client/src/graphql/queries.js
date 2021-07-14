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

export const USER_VIEW = gql`
  query userView($id: ID, $email: String) {
    user(id: $id, email: $email) {
      email
      name
      id
    }
  }
`

export const GENERAL_SETTINGS = gql`
  query GeneralSettings {
    generalSettings {
      site_name
    }
  }
`

export const SAVE_GENERAL_SETTINGS = gql`
  mutation SaveGeneralSettings($site_name: String) {
    saveGeneralSettings(settings: { site_name: $site_name }) {
      site_name
    }
  }
`
