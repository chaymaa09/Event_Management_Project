import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EventList} from './components/event-list/event-list';
import {Home} from './pages/home/home'
import { Landing } from './pages/landing/landing';
import { ExploreEvents } from './pages/explore-events/explore-events';
import { EventDetails } from './pages/event-details/event-details';

export const routes: Routes = [
  {path: '', component: Landing},  // Landing page with login/register
  {path: 'home', component: Home},  // Home page (after login)
  { path: 'events', component: ExploreEvents },
  { path: 'events/:id', component: EventDetails },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppModule {}
