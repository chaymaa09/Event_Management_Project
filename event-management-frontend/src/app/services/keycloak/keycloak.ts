import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import Keycloak from 'keycloak-js';

@Injectable({
  providedIn: 'root'
})
export class KeycloakService {
  private keycloak! : Keycloak;
  private initialized = false;
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
    
    if (this.isBrowser) {
      this.keycloak = new Keycloak({
        url: 'http://localhost:8080/',  
        realm: 'event-management-realm',             
        clientId: 'event-management-angular'      
      });
    }
  }

  async init(): Promise<boolean> {
    if (!this.isBrowser) {
      return false;
    }
    
    if (this.initialized) {
      return this.keycloak.authenticated || false;
    }
    
    try {
      const authenticated = await this.keycloak.init({
        onLoad: 'check-sso',
        checkLoginIframe: false,
        silentCheckSsoRedirectUri:
          window.location.origin + '/assets/silent-check-sso.html',
      });

      this.initialized = true;
      console.log('Keycloak initialized, authenticated:', authenticated);
      return authenticated;
    } catch (error) {
      // IMPORTANT: don't reject the app initializer; otherwise Angular may never bootstrap
      // and click handlers won't be wired up.
      console.error('Keycloak init failed:', error);
      this.initialized = true;
      return false;
    }
  }

  getToken(): string | undefined {
    if (!this.isBrowser) return undefined;
    return this.keycloak.token;
  }

  isAuthenticated(): boolean {
    if (!this.isBrowser) return false;
    return this.keycloak.authenticated || false;
  }

  async login(redirectPath?: string): Promise<void> {
    if (!this.isBrowser) {
      console.warn('Keycloak login ignored (not in browser)');
      return;
    }

    const redirectUri = redirectPath
      ? window.location.origin + redirectPath
      : window.location.origin + '/home';

    try {
      if (!this.initialized) {
        await this.init();
      }

      console.log('Starting Keycloak login redirect:', { redirectUri });
      await this.keycloak.login({ redirectUri });
    } catch (error) {
      console.error('Error calling keycloak login:', error);
    }
  }

  logout(): void {
    if (!this.isBrowser) return;
    
    this.keycloak.logout({
      redirectUri: window.location.origin
    });
  }

  getUsername(): string {
    if (!this.isBrowser) return '';
    return this.keycloak.tokenParsed?.['preferred_username'] || '';
  }
}
