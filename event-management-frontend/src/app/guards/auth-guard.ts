import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { KeycloakService } from '../services/keycloak/keycloak';

@Injectable({
  providedIn: 'root'
})
export class authGuard implements CanActivate {
  constructor(
    private keycloakService: KeycloakService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const isBrowser = isPlatformBrowser(this.platformId);

    if (!isBrowser) {
      return true;
    }

    if (this.keycloakService.isAuthenticated()) {
      return true;
    } else {
      this.keycloakService.login(state.url);
      return false;
    }
  }
}
