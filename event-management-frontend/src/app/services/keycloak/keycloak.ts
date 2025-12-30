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
    
    const authenticated = await this.keycloak.init({
      onLoad: 'check-sso',
      checkLoginIframe: false,
      silentCheckSsoRedirectUri: window.location.origin + '/assets/silent-check-sso.html'
    });
    
    this.initialized = true;
    console.log('Keycloak initialized, authenticated:', authenticated);
    console.log('browser environment:', this.isBrowser);
    return authenticated;
  }

  getToken(): string | undefined {
    if (!this.isBrowser) return undefined;
    return this.keycloak.token;
  }

  isAuthenticated(): boolean {
    if (!this.isBrowser) return false;
    return this.keycloak.authenticated || false;
  }

  login(redirectPath?: string): void {    
    const redirectUri = redirectPath 
      ? window.location.origin + redirectPath 
      : window.location.origin + '/home';
     try {
    this.keycloak.login({ redirectUri });
  } catch (error) {
    console.error('🔴 Error calling keycloak login:', error);
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
