import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { from, switchMap, catchError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const keycloakService = inject(KeycloakService);

  // Ensure we await Keycloak initialization and login state before proceeding.
  return from(Promise.resolve(keycloakService.isLoggedIn())).pipe(
    switchMap((isLoggedIn) => {
      if (!isLoggedIn) return next(req);

      // Refresh token if needed, then attach token header
      return from(keycloakService.updateToken(30)).pipe(
        switchMap(() => from(keycloakService.getToken())),
        switchMap((token) => {
          if (token) {
            const clonedReq = req.clone({
              setHeaders: {
                Authorization: `Bearer ${token}`,
              },
            });
            return next(clonedReq);
          }
          return next(req);
        }),
        catchError(() => next(req))
      );
    }),
    catchError(() => next(req))
  );
};