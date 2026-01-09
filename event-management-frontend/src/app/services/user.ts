import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, EMPTY, from} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {User} from '../models/user.model';
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

  getHostedEvents(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${userId}/hosted`);
  }

}
