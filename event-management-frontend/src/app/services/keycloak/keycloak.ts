import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { KeycloakService } from 'keycloak-angular';
import { firstValueFrom } from 'rxjs';

export function initializeKeycloak(keycloak: KeycloakService, platformId: object, http: HttpClient) {
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
    }).then(async (ok) => {
      try {
        const isLoggedIn = await keycloak.isLoggedIn();
        if (isLoggedIn) {
          await firstValueFrom(http.post('/api/users/sync-me', {}));
        }
      } catch (e) {
        // Do not block app startup if backend is unavailable.
        console.warn('⚠️ User DB sync failed', e);
      }
      return ok;
    });
  };
}