import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EventList} from './components/event-list/event-list';
import {Home} from './pages/home/home'
import { Landing } from './pages/landing/landing';
import { Settings } from './pages/settings/settings';
import { Profile } from './pages/profile/profile';
import { ExploreEvents } from './pages/explore-events/explore-events';
import { EventDetails } from './pages/event-details/event-details';
import { CreateEvent } from './pages/create-event/create-event';
import { AuthGuard } from './guards/auth-guard';
import { CategoryPage } from './pages/category-page/category-page';

export const routes: Routes = [
  {path: '', component: Landing},  // Landing page
  {path: 'home', component: Home, canActivate: [AuthGuard]},  // Protected
  { path: 'explore', component: ExploreEvents, canActivate: [AuthGuard]},
  { path: 'explore/:category', component: CategoryPage, canActivate: [AuthGuard]},  // Protected
  { path: 'events/:id', component: EventDetails, canActivate: [AuthGuard]},  // Protected
  { path: 'settings', component: Settings, canActivate: [AuthGuard]},  // Protected
  { path: 'profile', component: Profile, canActivate: [AuthGuard]},  // Protected
  { path: 'create-event', component: CreateEvent, canActivate: [AuthGuard]},  // Protected
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppModule {}
