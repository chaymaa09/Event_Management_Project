import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiUrl = '/api/users';

  constructor(private http: HttpClient) { }

  syncUserToDb(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/me`);
  }

}
