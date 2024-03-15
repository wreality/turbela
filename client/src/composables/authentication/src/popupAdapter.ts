import type { KeycloakAdapter, KeycloakFactoryAdapter } from '../keycloak-js/keycloak'

const channel = new BroadcastChannel('sso');
let popup: Window | null = null

export default ({ kc, processCallback, parseCallback, createPromise, initOptions }: KeycloakFactoryAdapter): KeycloakAdapter => {

  function createPopup(url: string) {
    if (popup && !popup.closed) {
      popup.close()
    }

    const popupWinWidth = 500;
    const popupWinHeight = 500;

    const left = (screen.width - popupWinWidth) / 2;
    const top = (screen.height - popupWinHeight) / 4;

    popup = window.open(
      url,
      '_blank',
      `popup=yes, width=${popupWinWidth},height=${popupWinHeight},top=${top},left=${left}`
    );

    return popup
  }

  function cleanupPopup() {
    if (popup) {
      popup.close()
      popup = null
    }
  }

  return {
    login: function (options) {
      const promise = createPromise()

      const loginUrl = kc.createLoginUrl(options)
      createPopup(loginUrl)

      channel.onmessage = (event) => {
        const oauth = parseCallback(event.data)

        processCallback(oauth, promise)
        promise.promise.then(() => {
          cleanupPopup()
          if (kc.authenticated) {
            kc.onAuthSuccess?.()
          } else {
            kc.onAuthError?.()
          }
        })
      }
      return promise.promise as Promise<void>
    },

    logout: function (options) {
      const promise = createPromise();

      const logoutUrl = kc.createLogoutUrl({ redirectUri: initOptions.silentCheckSsoRedirectUri, ...options });

      const ifrm = document.createElement('iframe');
      ifrm.setAttribute('src', logoutUrl);
      ifrm.setAttribute('sandbox', 'allow-storage-access-by-user-activation allow-scripts allow-same-origin');
      ifrm.setAttribute('title', 'keycloak-silent-logout-frame');
      ifrm.style.display = 'none';
      document.body.appendChild(ifrm);

      const messageCallback = function(event: MessageEvent) {
        if (event.origin !== window.location.origin || ifrm.contentWindow !== event.source) {
            return;
        }
        if (event.data == initOptions.silentCheckSsoRedirectUri) {
          document.body.removeChild(ifrm);
          window.removeEventListener('message', messageCallback);
          promise.setSuccess();
          kc.clearToken()
        }
    };

    window.addEventListener('message', messageCallback);


      return promise.promise as Promise<void>;
    },

    register: function () {
        const promise = createPromise();
      const registerUrl = kc.createRegisterUrl();

      window.location.href = registerUrl;
      return promise.promise as Promise<void>
    },
    accountManagement: function () {
      const accountUrl = kc.createAccountUrl();
      if (typeof accountUrl !== 'undefined') {
        window.location.href = accountUrl
      } else {
        throw 'Not supported by the OIDC server';
      }
      return Promise.resolve()
    },
    redirectUri: function () {
      return new URL('/sso/popup.html', window.location.origin).toString()
    }
  }
}
