import { RenderMode, ServerRoute } from '@angular/ssr';

// Prerender only static paths; use server render for dynamic param routes.
export const serverRoutes: ServerRoute[] = [
  { path: '', renderMode: RenderMode.Prerender },
  { path: 'events', renderMode: RenderMode.Prerender },
  { path: '**', renderMode: RenderMode.Server }
];
