import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Category } from '../models/category.model';
import { AppEvent } from '../models/event.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private baseUrl = `${environment.apiUrl}/categories`;

  constructor(private http: HttpClient) {}

  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.baseUrl}/all`);
  }

  getEventsByCategory(categoryName: string): Observable<AppEvent[]> {
    return this.http.get<AppEvent[]>(`${this.baseUrl}/events/${categoryName}`);
  }

  getEventsByCategoryAndLocation(categoryName: string, city?: string | null, country?: string | null): Observable<AppEvent[]> {
    let params = new HttpParams();
    if (city) params = params.set('city', city);
    if (country) params = params.set('country', country);
    return this.http.get<AppEvent[]>(`${this.baseUrl}/events/${encodeURIComponent(categoryName)}/by-location`, { params });
  }

  /**
   * Nearby events endpoint (backend may be at /api/events/nearby).
   * If your backend exposes a different path, update accordingly.
   */
  getNearbyEvents(lat: number, lng: number, radiusKm = 50, category?: string | null): Observable<AppEvent[]> {
    const url = `${environment.apiUrl}/events/nearby`;
    let params = new HttpParams()
      .set('lat', String(lat))
      .set('lng', String(lng))
      .set('radiusKm', String(radiusKm));
    if (category) params = params.set('category', category);
    return this.http.get<AppEvent[]>(url, { params });
  }

  getCategoryByName(categoryName: string): Observable<Category> {
    return this.http.get<Category>(`${this.baseUrl}/${categoryName}`);

  }

  subscribeToCategory(categoryId: number, userId: number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/${categoryId}/subscribe/${userId}`, {});
}

  unsubscribeFromCategory(categoryId: number, userId: number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/${categoryId}/unsubscribe/${userId}`, {});
  }

  isSubscribedToCategory(categoryId: number, userId: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}/${categoryId}/is-subscribed/${userId}`);
  }
}
