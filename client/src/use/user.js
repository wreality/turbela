import { useQuery, useResult, useMutation, useApolloClient } from '@vue/apollo-composable';
import gql from 'graphql-tag'
import { useQuasar } from 'quasar';
import { reactive, computed } from 'vue';

const userFragment = gql`
  fragment User_current on User {
    email
    name
    id
    roles
    abilities
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

const userExistsGQL = gql`
  query UserExists($email: String!) {
    userExists(email: $email)
  }
`;

export function useCurrentUser() {
  const query = useQuery(currentUserGQL);

  const currentUser = useResult(query.result, null, data => { return data.currentUser })
  const isLoggedIn = useResult(query.result, false, data => { return !!data.currentUser.id });
  const abilities = useResult(query.result, [], data => data.currentUser.abilities);

  const can = computed(() => {
    return (ability) => {
      return abilities.value.includes('*') || abilities.value.includes(ability);
    }
  });

  return { currentUser, currentUserQuery: query, isLoggedIn, can }
}

export function useLogin() {

  /**
   * Restore credentials.
   */
  const emailStorageKey = 'authEmail';
  const $qLS = useQuasar().localStorage;
  const credentials = reactive({ email: '', password: '' });

  if ($qLS.has(emailStorageKey)) {
    credentials.email = $qLS.getItem(emailStorageKey);
  }

  /**
   * Login a user.
   */
  const { mutate: loginMutation, loading: loginLoading, error: loginError } = useMutation(loginGQL,
    () => ({
      update: (cache, { data: { login } }) => {
        cache.writeQuery({ query: currentUserGQL, data: { currentUser: { ...login } } })
      }
    })
    );

  async function loginUser() {
    try {
      const currentUser = await loginMutation(credentials);
      $qLS.set(emailStorageKey, credentials.email);

      return currentUser.currentUser;
    } catch (e) {

      throw e;
    }
  }

  function notMe() {
    $qLS.remove(emailStorageKey);
  }
  /**
   * Check if a user exists for email first logins.
   */
  const { resolveClient } = useApolloClient();
  async function userExists(email) {
    const client = resolveClient();

    const userExists = await client.query({
      query: userExistsGQL,
      variables: {
        email
      }
    });

    return userExists.data.userExists;
  }




  return { loginUser, userExists, credentials, notMe };
}

export function useLogout() {
  const { mutate: logoutMutation, loading: logoutLoading, error: logoutError } = useMutation(logoutGQL,
    () => ({
      update: (cache) => {
        cache.writeQuery({ query: currentUserGQL, data: { currentUser: null } });
      }
    })
  );
  async function logoutUser() {
    return await logoutMutation();
  }

  return { logoutUser, logoutLoading, logoutError };
}
