import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { from, switchMap, catchError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const keycloakService = inject(KeycloakService);

  if (keycloakService.isLoggedIn()) {
    // Refresh token if expired
    return from(keycloakService.updateToken(30)).pipe(
      switchMap(() => from(keycloakService.getToken())),
      switchMap(token => {
        if (token) {
          const clonedReq = req.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`
            }
          });
          return next(clonedReq);
        }
        return next(req);
      }),
      catchError(() => next(req)) // If token update fails, proceed without token
    );
  } else {
    return next(req);
  }
};