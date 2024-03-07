import Keycloak, { KeycloakConfig, KeycloakInitOptions, KeycloakTokenParsed } from './keycloak'
import { LoginOptions, AuthEvents } from './types';
import popupAdapter from './popupAdapter';
import { ref } from 'vue';
import { createNanoEvents } from 'nanoevents';
import { useRuntimeConfig } from '../runtimeConfig';

const { get } = useRuntimeConfig()
const loginOptions: LoginOptions = {
  url: get('KEYCLOAK_ADMIN_URL'),
  clientId: get('KEYCLOAK_ADMIN_CLIENT_ID'),
  realm: get('KEYCLOAK_ADMIN_REALM'),
}

if (!loginOptions.url || !loginOptions.clientId || !loginOptions.realm) {
  throw new Error('Keycloak configuration is missing')
}

const keycloak = new Keycloak(loginOptions as KeycloakConfig)
const emitter = createNanoEvents()
const isAuthenticated = ref(false)
const token = ref<KeycloakTokenParsed | null>(null)

function createEventHandler<E extends keyof AuthEvents>(event: E) {
  return () => {
    isAuthenticated.value = keycloak.authenticated ?? false
    token.value = keycloak.tokenParsed ?? null
    emitter.emit(event, isAuthenticated.value)
  }
}

keycloak.onAuthSuccess = createEventHandler('authSuccess')
keycloak.onAuthError = createEventHandler('authError')
keycloak.onAuthRefreshSuccess = createEventHandler('authRefreshSuccess')
keycloak.onAuthRefreshError = createEventHandler('authRefreshError')
keycloak.onReady = createEventHandler('ready')
keycloak.onAuthLogout = createEventHandler('authLogout')


export function useAuthentication() {


  return {
    isAuthenticated,
    token,
    on<E extends keyof AuthEvents>(event: E, callback: AuthEvents[E]) {
      return emitter.on(event, callback)
    },
    init: async function (initOptions?: KeycloakInitOptions) {

      return new Promise(async (resolve, reject) => {
        try {
          const authenticated = await keycloak.init({
            silentCheckSsoRedirectUri: new URL('/sso/popup.html', window.location.origin).toString(),
            checkLoginIframe: true,
            onLoad: 'check-sso',
            redirectUri: window.location.origin,
            adapter: popupAdapter,
            ...initOptions
          })

          resolve(authenticated)
        }
        catch (error) {
          reject(error)
        }
      })
    },
    keycloak,
    refreshToken: async function () {
      return new Promise(async (resolve) => {

        const refreshed = await keycloak.updateToken(70)
        resolve(refreshed)
      })
    }
  }
}

