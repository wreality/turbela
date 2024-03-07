export interface LoginMessage {
  type: 'login';
  status: 'success' | 'error';
  message?: string;
}

export type LoginOptions = {
  url?: string,
  clientId?: string,
  realm?: string

}

export interface AuthEvents {
  authSuccess: () => void;
  authError: () => void;
  ready: (authenticated: boolean) => void;
  authRefreshSuccess: () => void;
  authRefreshError: () => void;
  authLogout: () => void;
}
