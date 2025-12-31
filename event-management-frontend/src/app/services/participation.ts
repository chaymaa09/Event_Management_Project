import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ParticipationDTO} from '../models/event.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ParticipationService {
  private baseUrl = `${environment.apiUrl}/participations`;

  constructor(private http: HttpClient) {}

  getParticipationCount(eventId: number): Observable<ParticipationDTO[]> {
    return this.http.get<ParticipationDTO[]>(`${this.baseUrl}/event/${eventId}`);
  }

  registerForEvent(userId: number, eventId: number): Observable<ParticipationDTO> {
    return this.http.post<ParticipationDTO>(`${this.baseUrl}/register?userId=${userId}&eventId=${eventId}`, {});
  }

  cancelParticipation(participationId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${participationId}`);
  }
}
