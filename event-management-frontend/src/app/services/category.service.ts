import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
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
    // Backend does not expose a category+location endpoint; fetch events by category
    // then filter client-side by city/country to avoid 404 errors.
    return this.getEventsByCategory(categoryName).pipe(
      map(events => {
        if (!city && !country) return events;
        const cityLower = city ? city.toLowerCase() : null;
        const countryLower = country ? country.toLowerCase() : null;
        return events.filter(e => {
          const evCity = e.location?.city?.toLowerCase();
          const evCountry = e.location?.country?.toLowerCase();
          const cityMatches = cityLower ? evCity === cityLower : true;
          const countryMatches = countryLower ? evCountry === countryLower : true;
          return cityMatches && countryMatches;
        });
      })
    );
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
