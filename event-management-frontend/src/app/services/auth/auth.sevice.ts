import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import { UserService } from '../user';
import { firstValueFrom } from 'rxjs';
import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private cachedUser: User | null = null;
  private loadUserPromise: Promise<User | null> | null = null;

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

  
  public login(redirectPath: string = '/'): void {
    const redirectUri = window.location.origin + redirectPath;
    this.keycloakService.login({ redirectUri });
  }

  public logout(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    localStorage.removeItem('currentUser');
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

    if (this.loadUserPromise) {
      return this.loadUserPromise;
    }

    this.loadUserPromise = (async () => {
      const isLoggedIn = await this.keycloakService.isLoggedIn();
      if (!isLoggedIn) return null;

      const tokenParsed: any = this.keycloakService.getKeycloakInstance().tokenParsed;
      const keycloakId = tokenParsed?.sub;
      const email = tokenParsed?.email;
      const name = tokenParsed?.name ?? tokenParsed?.preferred_username ?? tokenParsed?.username;
      const idp = tokenParsed?.idp;

      try {
        this.cachedUser = await firstValueFrom(this.userService.syncUserToDb());
        console.log('Synced User from backend:', this.cachedUser);
        if (isPlatformBrowser(this.platformId) && this.cachedUser) {
          localStorage.setItem('currentUser', JSON.stringify(this.cachedUser));
        }
        return this.cachedUser;
      } catch (e) {
        console.warn('⚠️ User DB sync failed', e);
        return null;
      }
    })().finally(() => {
      this.loadUserPromise = null;
    });

    return this.loadUserPromise;

  }

  getCurrentUser(): User | null {
    return this.cachedUser;
  }

  getCurrentUserName(): string {
    return this.cachedUser?.name ?? this.getUsername();
  }

  getCurrentUserEmail(): string {
    const cachedEmail = this.cachedUser?.email;
    if (cachedEmail) return cachedEmail;
    try {
      const tokenParsed: any = this.keycloakService.getKeycloakInstance().tokenParsed;
      return tokenParsed?.email ?? '';
    } catch {
      return '';
    }
  }

  getCurrentUserAvatarUrl(): string {
    return this.cachedUser?.avatarUrl ?? '';
  }

  openAccountManagement(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    try {
      this.keycloakService.getKeycloakInstance().accountManagement();
    } catch {
    }
  }
}