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

    try {
      const isAuth = await this.keycloak.isLoggedIn();
      if (!isAuth) {
        // Store intended destination and redirect to root to avoid server 404
        try {
          sessionStorage.setItem('auth_redirect', state.url);
        } catch { }
        await this.keycloak.login({ redirectUri: window.location.origin + '/' });
        return false;
      }

      // Handle required roles if specified in route data
      const requiredRoles = route.data['roles'];
      if (!requiredRoles || requiredRoles.length === 0) {
        return true;
      }

      // Check if user has required roles
      const hasRole = requiredRoles.some((role: string) => 
        this.keycloak.getUserRoles().includes(role)
      );

      if (!hasRole) {
        this.router.navigate(['/']);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Auth guard error:', error);
      // If there's an error during validation, allow access to prevent blocking the app
      return true;
    }
  }
}