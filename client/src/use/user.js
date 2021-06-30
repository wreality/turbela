import { useQuery, useResult, useMutation } from '@vue/apollo-composable';
import gql from 'graphql-tag'

const userFragment = gql`
  fragment User_current on User {
    email,
    id
  }
`;

const currentUserGQL = gql`
  query LoggedInUser {
    currentUser {
      ...User_current
    }
  }
  ${userFragment}
`;

const loginGQL = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email password: $password) {
        ...User_current
    }
  }
  ${userFragment}
`

const logoutGQL = gql`
  mutation Logout {
    logout {
      id
    }
  }
`;


export function useCurrentUserQuery() {
    const query = useQuery(currentUserGQL);
    return {
      query
    }
}

export function useCurrentUser() {
  const { query: { result } } = useCurrentUserQuery();
  const currentUser = useResult(result, null, data => { return data.currentUser })

  return { currentUser }
}

export function useIsLoggedIn() {
  const { query: { result } } = useCurrentUserQuery();
  const isLoggedIn = useResult(result, null, data => { return data.currentUser.id !== null });

  return { isLoggedIn };
}

export function useLogin() {
  const { mutate: loginUser, loading: loginLoading, error: loginError } = useMutation(loginGQL,
    () => ({
      update: (cache, { data: { login } }) => {
        cache.writeQuery({ query: currentUserGQL, data: { currentUser: { ...login } } })
      }
    })
  );

  return { loginUser, loginLoading, loginError };
}

export function useLogout() {
  const { mutate: logoutUser, loading: logoutLoading, error: logoutError } = useMutation(logoutGQL,
    () => ({
      update: (cache) => {
        cache.writeQuery({ query: currentUserGQL, data: { currentUser: null } });
      }
    })
  );
  return { logoutUser, logoutLoading, logoutError };
}
