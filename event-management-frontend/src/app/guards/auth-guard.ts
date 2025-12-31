import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { KeycloakAuthGuard, KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard extends KeycloakAuthGuard {
  constructor(
    protected override readonly router: Router,
    protected readonly keycloak: KeycloakService,
    @Inject(PLATFORM_ID) private platformId: object
  ) {
    super(router, keycloak);
  }

  async isAccessAllowed(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean | UrlTree> {
    if (!isPlatformBrowser(this.platformId)) {
      return true;
    }

    const isAuth = await this.keycloak.isLoggedIn();
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