import { useAuthentication } from 'src/composables/authentication';
import { boot } from 'quasar/wrappers'
import { defaultClient } from 'src/apollo/apollo-client';

export default boot(async () => {
  const { on, init, keycloak } = useAuthentication();

  on('ready', async (authenticated) => {
    if (authenticated) {
      console.log('Keycloak ready, authenticated')
      if (defaultClient) {
        defaultClient.resetStore()
      }
      return
    }

    console.log('Keycloak ready, not authenticated')
  })

  on('authSuccess', () => {
    if (defaultClient) {
      defaultClient.resetStore()
    }
  })

  on('authLogout', () => {
    if (defaultClient) {
      defaultClient.resetStore()
    }
  })

  on('authRefreshError', () => {
    if (defaultClient) {
      defaultClient.resetStore();
    }
  })

  await init()
  console.log('keycloak', keycloak)

})
