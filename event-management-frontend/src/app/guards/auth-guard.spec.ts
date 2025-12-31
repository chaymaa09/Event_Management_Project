import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { PLATFORM_ID } from '@angular/core';

import { authGuard } from './auth-guard';
import { KeycloakService } from '../services/keycloak/keycloak';

describe('authGuard', () => {
  let guard: authGuard;
  let keycloakServiceMock: jasmine.SpyObj<KeycloakService>;
  let mockRoute: ActivatedRouteSnapshot;
  let mockState: RouterStateSnapshot;

  beforeEach(() => {
    keycloakServiceMock = jasmine.createSpyObj('KeycloakService', ['isAuthenticated', 'login']);
    mockRoute = {} as ActivatedRouteSnapshot;
    mockState = { url: '/home' } as RouterStateSnapshot;

    TestBed.configureTestingModule({
      providers: [
        authGuard,
        { provide: KeycloakService, useValue: keycloakServiceMock },
        { provide: PLATFORM_ID, useValue: 'browser' }
      ]
    });

    guard = TestBed.inject(authGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should return true if user is authenticated', () => {
    keycloakServiceMock.isAuthenticated.and.returnValue(true);
    expect(guard.canActivate(mockRoute, mockState)).toBeTrue();
  });

  it('should return false and call login if not authenticated', () => {
    keycloakServiceMock.isAuthenticated.and.returnValue(false);
    expect(guard.canActivate(mockRoute, mockState)).toBeFalse();
    expect(keycloakServiceMock.login).toHaveBeenCalledWith('/home');
  });
});
