import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EventList} from './components/event-list/event-list';
import {Home} from './pages/home/home'
import { Landing } from './pages/landing/landing';
import { ExploreEvents } from './pages/explore-events/explore-events';
import { EventDetails } from './pages/event-details/event-details';
import { AuthGuard } from './guards/auth-guard';

export const routes: Routes = [
  {path: '', component: Landing},  // Landing page
  {path: 'home', component: Home, canActivate: [AuthGuard]},  // Protected
  { path: 'events', component: ExploreEvents, canActivate: [AuthGuard]},  // Protected
  { path: 'events/:id', component: EventDetails, canActivate: [AuthGuard]},  // Protected
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppModule {}
