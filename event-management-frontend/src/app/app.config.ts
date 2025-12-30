import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection, provideAppInitializer, inject } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { KeycloakService } from './services/keycloak/keycloak';
import { provideZoneChangeDetection } from '@angular/core';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withFetch(), withInterceptorsFromDi()),
    KeycloakService,
    provideAppInitializer(() => inject(KeycloakService).init()),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true } 
  ]
};
