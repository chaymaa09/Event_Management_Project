import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import {Event} from '../models/event.model'

@Injectable({
  providedIn: 'root',
})
export class EventService {
  apiUrl = 'http://localhost:8080/api/events';

  constructor(private http: HttpClient) {
  }

  getAllEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.apiUrl}/all`);
  }

  getEventById(id: number): Observable<Event> {
    return this.http.get<Event>(`${this.apiUrl}/${id}`);
  }

  createEvent(createEvent: Event): Observable<Event> {
    return this.http.post<Event>(`${this.apiUrl}/add`, createEvent);
  }
  updateEvent(id: number, updateEvent: Event): Observable<Event> {
    return this.http.put<Event>(`${this.apiUrl}/${id}`, updateEvent);
  }



}
