import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private keycloakService: KeycloakService,
    @Inject(PLATFORM_ID) private platformId: object
  ) {}

  public getUsername(): string {
    if (!isPlatformBrowser(this.platformId)) return '';
    try {
      if (!this.keycloakService.isLoggedIn()) return '';
      return this.keycloakService.getUsername();
    } catch {
      return '';
    }
  }

  public isLoggedIn(): boolean {
    if (!isPlatformBrowser(this.platformId)) return false;
    try {
      return this.keycloakService.isLoggedIn();
    } catch {
      return false;
    }
  }

  public async loadUserProfile(): Promise<KeycloakProfile> {
    return await this.keycloakService.loadUserProfile();
  }

  public login(): void {
    this.keycloakService.login();
  }

  public logout(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.keycloakService.logout(window.location.origin);
  }

  public getToken(): Promise<string> {
    return this.keycloakService.getToken();
  }

  register(redirectPath: string = '/'): void {
    const redirectUri = window.location.origin + redirectPath;
    this.keycloakService.register({ redirectUri });
  }

}