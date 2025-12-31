import { isPlatformBrowser } from '@angular/common';
import { KeycloakService } from 'keycloak-angular';

export function initializeKeycloak(keycloak: KeycloakService, platformId: object) {
  return () => {
    
    
    if (!isPlatformBrowser(platformId)) {
      // SSR: Keycloak relies on browser globals like `window`.
      return Promise.resolve(true);
    }
    console.log('🔐 Initialisation de Keycloak...');
    return keycloak.init({
      config: {
        url: 'http://localhost:8080',
        realm: 'event-management-realm',
        clientId: 'event-management-angular'
      },
      initOptions: {
        onLoad: 'check-sso',
        checkLoginIframe: false
      },
      enableBearerInterceptor: true,
      bearerPrefix: 'Bearer',
      bearerExcludedUrls: ['/assets', '/api/public']
    });
  };
}