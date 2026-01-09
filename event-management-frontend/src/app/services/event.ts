import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import {AppEvent} from '../models/event.model'
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private baseUrl = `${environment.apiUrl}/events`;

  constructor(private http: HttpClient) {
  }

  getAllEvents(): Observable<AppEvent[]> {
    return this.http.get<AppEvent[]>(`${this.baseUrl}/all`);
  }

  getEventById(id: number): Observable<AppEvent> {
    return this.http.get<AppEvent>(`${this.baseUrl}/${id}`);
  }

  createEvent(createEvent: AppEvent): Observable<AppEvent> {
    return this.http.post<AppEvent>(`${this.baseUrl}/add`, createEvent);
  }
  updateEvent(id: number, updateEvent: AppEvent): Observable<AppEvent> {
    return this.http.put<AppEvent>(`${this.baseUrl}/${id}`, updateEvent);
  }

  deleteEvent(id: number)  {
    return this.http.delete<AppEvent>(`${this.baseUrl}/delete/${id}`);
  }

  getTrending(limit = 3): Observable<AppEvent[]> {
    return this.http.get<AppEvent[]>(`${this.baseUrl}/trending`, {
      params: { limit }
    });
  }

  uploadPoster(file: File): Observable<{ posterUrl: string }> {
    const formData = new FormData();
    formData.append('poster', file);
    return this.http.post<{ posterUrl: string }>(`${this.baseUrl}/upload-poster`, formData);
  }

  getEventsByCity(cityName: string): Observable<AppEvent[]> {
    return this.http.get<AppEvent[]>(`${this.baseUrl}/city/${cityName}`);
  }


}
