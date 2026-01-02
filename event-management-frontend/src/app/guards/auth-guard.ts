import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private readonly router: Router,
    private readonly keycloak: KeycloakService,
    @Inject(PLATFORM_ID) private platformId: object
  ) {}

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean | UrlTree> {
    if (!isPlatformBrowser(this.platformId)) {
      return true;
    }

    let isAuth = false;
    try {
      isAuth = await this.keycloak.isLoggedIn();
    } catch {
      // If Keycloak isn't initialized for any reason, treat as logged out.
      isAuth = false;
    }

    if (!isAuth) {
      // Store intended destination and redirect to root to avoid server 404
      try {
        sessionStorage.setItem('auth_redirect', state.url);
      } catch { }
      await this.keycloak.login({ redirectUri: window.location.origin + '/' });
      return false;
    }
    return true;

  }
}