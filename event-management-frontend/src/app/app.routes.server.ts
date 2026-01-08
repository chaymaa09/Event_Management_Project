import { RenderMode, ServerRoute } from '@angular/ssr';

// Prerender only static paths; use server render for dynamic param routes.
export const serverRoutes: ServerRoute[] = [
  { path: '', renderMode: RenderMode.Prerender },
  { path: 'explore', renderMode: RenderMode.Prerender },
  { path: '**', renderMode: RenderMode.Server }
];
