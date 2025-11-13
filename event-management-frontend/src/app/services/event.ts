import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import {AppEvent} from '../models/event.model'

@Injectable({
  providedIn: 'root',
})
export class EventService {
  apiUrl = 'http://localhost:8080/api/events';

  constructor(private http: HttpClient) {
  }

  getAllEvents(): Observable<AppEvent[]> {
    return this.http.get<AppEvent[]>(`${this.apiUrl}/all`);
  }

  getEventById(id: number): Observable<AppEvent> {
    return this.http.get<AppEvent>(`${this.apiUrl}/${id}`);
  }

  createEvent(createEvent: AppEvent): Observable<AppEvent> {
    return this.http.post<AppEvent>(`${this.apiUrl}/add`, createEvent);
  }
  updateEvent(id: number, updateEvent: AppEvent): Observable<AppEvent> {
    return this.http.put<AppEvent>(`${this.apiUrl}/${id}`, updateEvent);
  }

  deleteEvent(id: number)  {
    return this.http.delete<AppEvent>(`${this.apiUrl}/delete/${id}`);
  }


}
