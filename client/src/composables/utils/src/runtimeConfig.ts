
declare global {
  interface Window {
    configs: Record<string, string>
   }
}

const preBuildConfig = {
  API: process.env.API || new URL('/graphql', window.location.origin).toString(),
  KEYCLOAK_ADMIN_URL: process.env.KEYCLOAK_ADMIN_URL,
  KEYCLOAK_ADMIN_REALM: process.env.KEYCLOAK_ADMIN_REALM,
  KEYCLOAK_ADMIN_CLIENT_ID: process.env.KEYCLOAK_ADMIN_CLIENT_ID
}

export function useRuntimeConfig() {
  return {
    get(key: keyof typeof preBuildConfig) {
      return window?.configs?.[key] ?? preBuildConfig[key]
    }
  }
}
