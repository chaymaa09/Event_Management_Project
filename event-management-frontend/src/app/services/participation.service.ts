import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Subscriber, User } from '../models/event.model';


@Injectable({
  providedIn: 'root',
})
export class ParticipationService {
  private baseUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) {}

  getEventSubscribers(eventId: number): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/event/${eventId}/subscribers`);
  }
}
