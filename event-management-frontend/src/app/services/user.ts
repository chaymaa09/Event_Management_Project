import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, EMPTY, from} from 'rxjs';
import {switchMap, map} from 'rxjs/operators';
import {User} from '../models/user.model';
import { AppEvent } from '../models/event.model';
import { environment } from '../../environments/environment';
import { KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly apiUrl = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient, private keycloak: KeycloakService) { }

  syncUserToDb(): Observable<User> {
    return from(Promise.resolve(this.keycloak.isLoggedIn())).pipe(
      switchMap((isLoggedIn) => isLoggedIn ? this.http.get<User>(`${this.apiUrl}/me`) : EMPTY)
    );
  }

  updateProfile(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/me/update`, user);
  }

  addEmail(email: string): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/me/emailsup/add`, email);
  }

  removeEmail(index: number): Observable<User> {
    return this.http.delete<User>(`${this.apiUrl}/me/emailsup/delete/${index}`);
  }

  deleteAccount(): Observable<any> {
    return this.http.delete(`${this.apiUrl}/me/delete`);
  }

  uploadAvatar(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('avatar', file);
    return this.http.post(`${this.apiUrl}/me/avatar`, formData);
  }

  getHostedEvents(userId: number): Observable<AppEvent[]> {
    return this.http.get<AppEvent[]>(`${this.apiUrl}/${userId}/hosted`).pipe(
      map(events => {
        if (!Array.isArray(events)) return [] as AppEvent[];
        const now = Date.now();

        const splitAndSort = (list: AppEvent[]) => {
          // Group by category
          const groups: Record<string, AppEvent[]> = {};
          list.forEach(e => {
            const key = (e.category || 'Uncategorized').toString();
            if (!groups[key]) groups[key] = [];
            groups[key].push(e);
          });

          // Sort each category's events by startDate desc
          Object.values(groups).forEach(arr => {
            arr.sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());
          });

          // Order categories by their latest startDate descending
          const orderedCategories = Object.keys(groups).sort((a, b) => {
            const aMax = groups[a][0] ? new Date(groups[a][0].startDate).getTime() : 0;
            const bMax = groups[b][0] ? new Date(groups[b][0].startDate).getTime() : 0;
            return bMax - aMax;
          });

          // Flatten
          return orderedCategories.flatMap(cat => groups[cat]);
        };

        const upcoming = events.filter(e => new Date(e.startDate).getTime() >= now);
        const past = events.filter(e => new Date(e.startDate).getTime() < now);

        const sortedUpcoming = splitAndSort(upcoming);
        const sortedPast = splitAndSort(past);

        return [...sortedUpcoming, ...sortedPast];
      })
    );
  }

}
