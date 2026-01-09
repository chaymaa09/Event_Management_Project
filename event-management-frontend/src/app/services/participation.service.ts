import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Participation, Subscriber, User } from '../models/event.model';


@Injectable({
  providedIn: 'root',
})
export class ParticipationService {
  private baseUrl = `${environment.apiUrl}/participations`;

  constructor(private http: HttpClient) {}

  getEventSubscribers(eventId: number): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/event/${eventId}/subscribers`);
  }

  getJoinedAttendees(eventId: number): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/event/${eventId}/joined`);

}

  requestToJoinEvent(eventId: number, userId: number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/event/${eventId}/request/${userId}`, {});
  }

  joinEvent(eventId: number, userId: number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/event/${eventId}/join/${userId}`, {});
  }

  updateStatus(participationId: number, status: string): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${participationId}/status?status=${encodeURIComponent(status)}`, {});
  }

 
  getEventParticipations(eventId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/event/${eventId}`);
  }

  getParticipation(eventId: number, userId: number): Observable<Participation> {
    return this.http.get<Participation>(`${this.baseUrl}/get/event/${eventId}/user/${userId}`);
  }

  // Fetch participations for a given user (attended/joined events)
  getUserParticipations(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/user/${userId}`);
  }

  // Fetch all participants for an event, excluding CANCELLED, sorted by: ABANDONED, BLOCKED, others
  getEventParticipantsActive(eventId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/event/${eventId}/active`);
  }
}
