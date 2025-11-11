import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../models/event.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiUrl = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient) { }


}
