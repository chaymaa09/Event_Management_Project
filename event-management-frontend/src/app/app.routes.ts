import { Routes } from '@angular/router';
import {EventList} from './components/event-list/event-list';


export const routes: Routes = [
  { path: 'events', component: EventList},
];
