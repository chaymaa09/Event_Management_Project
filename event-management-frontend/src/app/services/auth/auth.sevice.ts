import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import { UserService } from '../user';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private keycloakService: KeycloakService,
    @Inject(PLATFORM_ID) private platformId: object,
    private userService: UserService
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

  public login(redirectPath: string = '/'): void {
    const redirectUri = window.location.origin + redirectPath;
    this.keycloakService.login({ redirectUri });
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

  async loadUser() {
    if (!isPlatformBrowser(this.platformId)) return null;

    const isLoggedIn = await this.keycloakService.isLoggedIn();
    if (!isLoggedIn) return null;

    const tokenParsed: any = this.keycloakService.getKeycloakInstance().tokenParsed;

    const keycloakId = tokenParsed?.sub;
    const email = tokenParsed?.email;
    const name = tokenParsed?.name ?? tokenParsed?.preferred_username ?? tokenParsed?.username;
    const idp = tokenParsed?.idp;

    console.log('User Info:', { keycloakId, email, name, idp });
    await firstValueFrom(this.userService.syncUserToDb());

    return { keycloakId, email, name, idp };

  }
}