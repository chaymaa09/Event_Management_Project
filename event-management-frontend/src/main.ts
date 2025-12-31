import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import 'zone.js'; 

// Simply bootstrap the app - KeycloakService will handle browser detection internally
bootstrapApplication(App, appConfig)
  .catch((err: Error) => console.error(err));